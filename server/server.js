const path = require('node:path');
const fp = require('fastify-plugin');
const fastifyEnv = require('@fastify/env');
const fastify = require('fastify')({
  logger: true, querystringParser: str => require('qs').parse(str)
});
const httpErrors = require('http-errors');

const packageJson = require('./package.json');

const version = `v${packageJson.version.split('.')[0]}`;

const createServer = () => {
  fastify.register(fastifyEnv, {
    dotenv: true, schema: {
      type: 'object', properties: {
        PORT: { type: 'number', default: 8040 },
        MAX_CACHE_KEYS: { type: 'number', default: 1000 },
        MAX_TASK_SIZE: { type: 'number', default: 100 },
        MAX_CONCURRENT: { type: 'number', default: 10 },
        PAGE_WIDTH: { type: 'number', default: 1366 },
        PAGE_HEIGHT: { type: 'number', default: 768 },
        SANDBOX_DISABLED: { type: 'boolean', default: true }
      }
    }
  });

  fastify.register(fp(async fastify => {
    const args = [];

    if (fastify.config.SANDBOX_DISABLED) {
      args.push('--no-sandbox', '--disable-setuid-sandbox');
    }

    fastify.register(require('@kne/fastify-puppeteer'), {
      prefix: `/api/${version}`,
      maxCacheKeys: fastify.config.MAX_CACHE_KEYS,
      maxTaskSize: fastify.config.MAX_TASK_SIZE,
      pageWidth: fastify.config.PAGE_WIDTH,
      pageHeight: fastify.config.PAGE_HEIGHT,
      maxConcurrent: fastify.config.MAX_CONCURRENT,
      puppeteerOptions: {
        args
      },
      pageViewport: {
        deviceScaleFactor: 2
      }
    });

    fastify.register(require('@kne/fastify-namespace'), {
      name: 'node-webpage-print', options: Object.assign({}, {
        prefix: `/api/${version}`, root: path.resolve(process.cwd(), '.puppeteer_cache')
      }), modules: [['controllers', path.resolve(__dirname, './controllers.js')]]
    });
  }));

  fastify.register(require('fastify-plugin')(async fastify => {
    const getEntry = () => {
      const env = fastify.config.ENV;
      if (env === 'staging') {
        return 'entry.html';
      }

      if (env === 'prod') {
        return 'entry-prod.html';
      }

      return 'index.html';
    };

    fastify.register(require('@fastify/static'), {
      root: path.join(__dirname, './build'), // 静态文件目录
      prefix: '/', index: getEntry()
    });

    fastify.setNotFoundHandler((req, reply) => {
      if (req.method === 'GET') {
        reply.sendFile(getEntry(), { root: path.join(__dirname, './build') });
      } else {
        throw new httpErrors.NotFound();
      }
    });
  }));
  fastify.register(require('@kne/fastify-response-data-format'));
};

module.exports = {
  fastify, createServer, start: () => {
    createServer();
    return fastify.then(() => {
      fastify.listen({ port: fastify.config.PORT, host: '0.0.0.0' }, (err, address) => {
        if (err) throw err;
        console.log(`Server is now listening on ${address}`);
      });
    });
  }
};