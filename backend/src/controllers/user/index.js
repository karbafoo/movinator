const Identifier = require('./identifier.model');
const User = require('./user.model');

const getNewIdentifier = () => {
    return new Promise((resolve, reject) => {
        const newIdentifier = new Identifier({});
        newIdentifier.save((err, idDoc) => {
            if (err) throw err;

            resolve(idDoc.toObject());
        });
    });
};
const getIdentifier = ({id} = {}) => {
    return new Promise((resolve, reject) => {
        Identifier.findById(id)
            .then((identifier) => {
                if (identifier) {
                    resolve(identifier);
                } else {
                    reject(404);
                }
            })
            .catch(reject);
    });
};

module.exports = {
    getNewIdentifier,
    getIdentifier,
};
