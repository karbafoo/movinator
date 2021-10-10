async function routes(fastify, options) {
    fastify.register(require('./user'), {prefix: '/user'});
    fastify.register(require('./movie'), {prefix: '/movies'});
    fastify.register(require('./list'), {prefix: '/list'});
}

module.exports = routes;
