const fp = require('fastify-plugin');
const qs = require('qs');
const omit = require('lodash/omit');
const merge = require('lodash/merge');
const NodeCache = require('node-cache');
const crypto = require('node:crypto');

const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600, maxKeys: 1000 });

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

  fastify.post(`${options.prefix}/parseRemoteModuleToPdf`, {
    onRequest: options.authenticate, schema: {
      description: '接口说明', summary: 'remoteModule生成pdf文件流(Post)', body: {
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
    const cacheKey = crypto.randomUUID();
    const params = omit(request.body, ['options']);
    cache.set(cacheKey, params);
    console.log('---->cacheKey', cacheKey);
    const filename = await services.parseUrlToPdf({
      url: `http://localhost:${fastify.config.PORT}?cacheKey=${cacheKey}`,
      selector: request.body.options?.selector,
      options: Object.assign({}, request.body.options, {
        waitForSelectors: [...(request.body.options?.waitForSelectors || []), '#target']
      })
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

  fastify.post(`${options.prefix}/parseRemoteModuleToPhoto`, {
    onRequest: options.authenticate, schema: {
      description: '接口说明', summary: 'remoteModule生成png文件流(Post)', body: {
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
    const cacheKey = crypto.randomUUID();
    const params = omit(request.body, ['options']);
    cache.set(cacheKey, params);
    const filename = await services.parseUrlToPhoto({
      url: `http://localhost:${fastify.config.PORT}?cacheKey=${cacheKey}`,
      selector: request.body.options?.selector,
      options: Object.assign({}, request.body.options, {
        waitForSelectors: [...(request.body.options?.waitForSelectors || []), '#target']
      })
    });
    return reply.sendFile(filename, { root: options.root });
  });

  fastify.get(`${options.prefix}/cache/:key`, {
    onRequest: options.authenticate, schema: {
      description: '接口说明', summary: '通过cacheKey获取缓存文件', params: {
        type: 'object', required: ['key'], properties: {
          key: { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const params = cache.get(request.params.key);
    if (!params) {
      throw new Error('Cache key not found or expired');
    }
    cache.del(request.params.key);
    return params;
  });
});