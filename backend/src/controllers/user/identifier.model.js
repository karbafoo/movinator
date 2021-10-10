const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// UserIdentifier Schema
const UserIdentifierSchema = mongoose.Schema(
    {},
    {
        timestamps: {
            createdAt: 'created_at',
        },
    }
);

const UserIdentifier =
    mongoose.models.UserIdentifier ||
    mongoose.model('UserIdentifier', UserIdentifierSchema);
module.exports = UserIdentifier;
