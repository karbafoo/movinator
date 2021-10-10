const fs = require('fs');
const path = require('path');
const {ListController} = require('../controllers');

async function routes(fastify, options) {
    fastify.addHook('preHandler', fastify.auth([fastify.verifyJWTandLevel]));
    fastify.route({
        method: 'POST',
        url: '/make',
        handler: MakeList,
    });
    fastify.route({
        method: 'GET',
        url: '/get',
        handler: getUserLists,
    });
    fastify.route({
        method: 'GET',
        url: '/get/:list',
        handler: getList,
    });
    fastify.route({
        method: 'POST',
        url: '/add',
        handler: addToList,
    });
    fastify.route({
        method: 'POST',
        url: '/remove',
        handler: removeFromList,
    });
}

module.exports = routes;

const MakeList = async (request, reply) => {
    try {
        console.log('request.body\n\n\n', request.body);
        const data = await ListController.MakeList(request.user, request.body);
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        console.log('err', err);
        reply.send({err: 'ERROR'});
    }
};
const getUserLists = async (request, reply) => {
    try {
        const data = await ListController.getUserLists(request.user);
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        console.log('err', err);
        reply.send({err: 'ERROR'});
    }
};
const getList = async (request, reply) => {
    try {
        const data = await ListController.getList(request.user, request.params);
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        console.log('err', err);
        reply.send({err: 'ERROR'});
    }
};

const addToList = async (request, reply) => {
    try {
        const data = await ListController.addToList(request.user, request.body);
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        console.log('err', err);
        reply.send({err: 'ERROR'});
    }
};
const removeFromList = async (request, reply) => {
    try {
        const data = await ListController.removeFromList(
            request.user,
            request.body
        );
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        console.log('err', err);
        reply.send({err: 'ERROR'});
    }
};
