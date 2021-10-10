const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MovieListItem Schema
const MovieListItemSchema = mongoose.Schema(
    {
        imdb_id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
        },
        poster_path: {
            type: String,
        },
        list: {
            type: Schema.Types.ObjectId,
            ref: 'MovieList',
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

const MovieListItem =
    mongoose.models.MovieListItem ||
    mongoose.model('MovieListItem', MovieListItemSchema);
module.exports = MovieListItem;
