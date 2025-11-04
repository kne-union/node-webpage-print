const fp = require('fastify-plugin');
const qs = require('qs');
const pick = require('lodash/pick');

module.exports = fp(async (fastify, options) => {
  const { services } = fastify.puppeteer;
  fastify.get(`${options.prefix}/parseRemoteModuleToPdf`, {
    onRequest: options.authenticate, schema: {
      description: '接口说明', summary: 'remoteModule生成pdf文件流', query: {
        type: 'object', required: ['content'], properties: {
          options: { type: 'object' }, content: { type: 'string' }, scope: { type: 'string' }, props: { type: 'object' }
        }
      }
    }
  }, async (request, reply) => {
    const filename = await services.parseUrlToPdf({
      url: `http://localhost:${fastify.config.PORT}?${qs.stringify(pick(request.query, ['content', 'scope', 'props', 'encodeProps']))}`,
      options: request.query.options
    });
    return reply.sendFile(filename, { root: options.root });
  });

  fastify.get(`${options.prefix}/parseRemoteModuleToPhoto`, {
    onRequest: options.authenticate, schema: {
      description: '接口说明', summary: 'remoteModule生成png文件流', query: {
        type: 'object', required: ['content'], properties: {
          options: { type: 'object' }, content: { type: 'string' }, scope: { type: 'string' }, props: { type: 'object' }
        }
      }
    }
  }, async (request, reply) => {
    const filename = await services.parseUrlToPhoto({
      url: `http://localhost:${fastify.config.PORT}?${qs.stringify(pick(request.query, ['content', 'scope', 'props', 'encodeProps']))}`,
      options: request.query.options
    });
    return reply.sendFile(filename, { root: options.root });
  });
});