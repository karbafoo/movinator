const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = mongoose.Schema(
    {
        identifier: {
            type: Schema.Types.ObjectId,
            ref: 'Identifier',
            required: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
