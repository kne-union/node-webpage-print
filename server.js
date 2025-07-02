const path = require('node:path');
const fp = require('fastify-plugin');
const fastifyEnv = require('@fastify/env');
const fastify = require('fastify')({
    logger: true, querystringParser: str => require('qs').parse(str)
});

const packageJson = require('./package.json');

const version = `v${packageJson.version.split('.')[0]}`;

const createServer = () => {
    fastify.register(fastifyEnv, {
        dotenv: true, schema: {
            type: 'object', properties: {
                PORT: {type: 'number', default: 8040},
                MAX_CACHE_KEYS: {type: 'number', default: 1000},
                MAX_TASK_SIZE: {type: 'number', default: 100},
                PAGE_WIDTH: {type: 'number', default: 1366},
                PAGE_HEIGHT: {type: 'number', default: 768},
                SANDBOX_DISABLED: {type: 'boolean', default: true}
            }
        }
    });

    fastify.register(fp(async fastify => {
        fastify.register(require('@fastify/static'), {
            root: path.resolve('./')
        });

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
            puppeteerOptions: {
                args
            }
        });
    }));
};

module.exports = {
    fastify, createServer, start: () => {
        createServer();
        return fastify.then(() => {
            fastify.listen({port: fastify.config.PORT, host: '0.0.0.0'}, (err, address) => {
                if (err) throw err;
                console.log(`Server is now listening on ${address}`);
            });
        });
    }
};