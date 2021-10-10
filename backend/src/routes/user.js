const jwt = require('jsonwebtoken');
const config = require('../../config');
const {UserController, ListController} = require('../controllers');

async function routes(fastify, options) {
    fastify.route({
        method: 'GET',
        url: '/init',
        handler: Init,
    });
}
module.exports = routes;

const Init = async (request, reply) => {
    try {
        const identifier = await UserController.getNewIdentifier();
        await ListController.initiate(identifier);
        jwt.sign(
            {id: identifier._id},
            config.USER_SECRET,
            {algorithm: 'RS256'},
            (err, token) => {
                if (err) throw err;
                console.log('token \n\n\n', token);
                reply
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({data: token, success: true});
            }
        );
    } catch (err) {
        console.log('err\n\n', err);
        reply.send({err: 'ERROR'});
    }
};
