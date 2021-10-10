const fs = require('fs');
const path = require('path');
const {MovieController} = require('../controllers');

async function routes(fastify, options) {
    fastify.route({
        method: 'GET',
        url: '/videos',
        handler: getMovieVideos,
    });
    fastify.route({
        method: 'GET',
        url: '/get',
        handler: getMovieDetails,
    });
    fastify.route({
        method: 'GET',
        url: '/popular',
        handler: getPopularMovies,
    });
    fastify.route({
        method: 'GET',
        url: '/upcoming',
        handler: getUpcomingMovies,
    });
    fastify.route({
        method: 'GET',
        url: '/search',
        handler: searchMovies,
    });
}

module.exports = routes;

const getMovieDetails = async (request, reply) => {
    try {
        const data = await MovieController.getMovieDetails(request.query);
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        console.log('err', err);
        reply.send({err: 'ERROR'});
    }
};

const getMovieVideos = async (request, reply) => {
    try {
        const data = await MovieController.getMovieVideos(request.query);
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        console.log('err', err);
        reply.send({err: 'ERROR'});
    }
};

const searchMovies = async (request, reply) => {
    try {
        const data = await MovieController.searchMovies(request.query);
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        console.log('err', err);
        reply.send({err: 'ERROR'});
    }
};

const getPopularMovies = async (request, reply) => {
    try {
        const data = await MovieController.getPopularMovies();
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        console.log('err', err);
        reply.send({err: 'ERROR'});
    }
};

const getUpcomingMovies = async (request, reply) => {
    try {
        const data = await MovieController.getUpcomingMovies();
        reply
            .code(200)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send({data: data, success: true});
    } catch (err) {
        console.log('err', err);
        reply.send({err: 'ERROR'});
    }
};
