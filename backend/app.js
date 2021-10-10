const jwt = require('jsonwebtoken');
const config = require('./config');
const db = require('./database');
const {UserController} = require('./src/controllers');
db.Initiate();

const fastify = require('fastify')({
    logger: true,
});
fastify.register(require('fastify-cors'), {
    // put your options here
});

fastify
    .decorate('verifyJWTandLevel', function (request, reply, done) {
        if (
            request.headers &&
            request.headers.authorization &&
            request.headers.authorization.startsWith('Bearer ')
        ) {
            const token = request.headers.authorization.substr(7);
            jwt.verify(
                token,
                config.USER_SECRET,
                {algorithms: ['RS256']},
                (err, decoded) => {
                    if (err) {
                        done(new Error('unauthorized'));
                    } else {
                        UserController.getIdentifier(decoded)
                            .then((identifier) => {
                                request.user = identifier;
                                done();
                            })
                            .catch((err) => {
                                done(new Error('unauthorized'));
                            });
                    }
                }
            );
        } else {
            done(new Error('unauthorized'));
        }
    })
    .decorate('verifyUserAndPassword', function (request, reply, done) {
        done();
    })
    .register(require('fastify-auth'));

fastify.register(require('./src/routes'));

fastify.listen(process.env.PORT || 8081, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});
