const fp = require('fastify-plugin');
const qs = require('qs');
const omit = require('lodash/omit');
const merge = require('lodash/merge');

module.exports = fp(async (fastify, options) => {
  const { services } = fastify.puppeteer;
  const { photoSchema, pdfSchema } = services;
  fastify.get(`${options.prefix}/parseRemoteModuleToPdf`, {
    onRequest: options.authenticate, schema: {
      description: '接口说明', summary: 'remoteModule生成pdf文件流', query: {
        type: 'object', required: ['content'], properties: {
          options: merge({}, pdfSchema, {
            properties: {
              selector: { type: 'string' }
            }
          }), content: { type: 'string' }, scope: { type: 'string' }, props: { type: 'object' }
        }
      }
    }
  }, async (request, reply) => {
    const filename = await services.parseUrlToPdf({
      url: `http://localhost:${fastify.config.PORT}?${qs.stringify(omit(request.query, ['options']))}`,
      selector: request.query.options?.selector,
      options: request.query.options
    });
    return reply.sendFile(filename, { root: options.root });
  });

  fastify.get(`${options.prefix}/parseRemoteModuleToPhoto`, {
    onRequest: options.authenticate, schema: {
      description: '接口说明', summary: 'remoteModule生成png文件流', query: {
        type: 'object', required: ['content'], properties: {
          options: merge({}, photoSchema, {
            properties: {
              selector: { type: 'string' }
            }
          }), content: { type: 'string' }, scope: { type: 'string' }, props: { type: 'object' }
        }
      }
    }
  }, async (request, reply) => {
    const filename = await services.parseUrlToPhoto({
      url: `http://localhost:${fastify.config.PORT}?${qs.stringify(omit(request.query, ['options']))}`,
      selector: request.query.options?.selector,
      options: request.query.options
    });
    return reply.sendFile(filename, { root: options.root });
  });
});