const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MovieList Schema
const MovieListSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            default: 'folder',
        },
        primary: {
            type: Boolean,
            default: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'Identifier',
            required: true,
            index: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    }
);

const MovieList =
    mongoose.models.MovieList || mongoose.model('MovieList', MovieListSchema);
module.exports = MovieList;
