const axios = require('axios');

const getMovieDetails = ({imdb_id} = {}) => {
    return new Promise((resolve, reject) => {
        if (!imdb_id || !imdb_id.toString().trim().length)
            return reject(new Error('ID required'));
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/' + imdb_id,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjc2YTYwNDU0MzdkODJjN2Y0ZDVmNTRkMjcxOTAzNCIsInN1YiI6IjYxNTg1YWJmNmY4ZDk1MDA0NDY4NGQ2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zasyxfU2KOgjkkwHEKkBgg7C3l8VAXGnxFBb_eprsdA',
            },
        };
        axios
            .request(options)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log('error', error);
                reject(error);
            });
    });
};
const getMovieVideos = ({imdb_id} = {}) => {
    return new Promise((resolve, reject) => {
        if (!imdb_id || !imdb_id.toString().trim().length)
            return reject(new Error('ID required'));
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/' + imdb_id + '/videos',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjc2YTYwNDU0MzdkODJjN2Y0ZDVmNTRkMjcxOTAzNCIsInN1YiI6IjYxNTg1YWJmNmY4ZDk1MDA0NDY4NGQ2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zasyxfU2KOgjkkwHEKkBgg7C3l8VAXGnxFBb_eprsdA',
            },
        };
        axios
            .request(options)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.log('error', error);
                reject(error);
            });
    });
};
const searchMovies = ({keyword} = {}) => {
    return new Promise((resolve, reject) => {
        if (!keyword || !keyword.toString().trim().length) return resolve([]);
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/search/movie',
            params: {query: keyword.toString().trim(), adult: true},
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjc2YTYwNDU0MzdkODJjN2Y0ZDVmNTRkMjcxOTAzNCIsInN1YiI6IjYxNTg1YWJmNmY4ZDk1MDA0NDY4NGQ2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zasyxfU2KOgjkkwHEKkBgg7C3l8VAXGnxFBb_eprsdA',
            },
        };
        axios
            .request(options)
            .then((response) => {
                resolve(response.data.results);
            })
            .catch((error) => {
                console.log('error', error);
                reject(error);
            });
    });
};
let popular = []; //request limit workaround
const getPopularMovies = () => {
    return new Promise((resolve, reject) => {
        if (popular.length) {
            return resolve(popular);
        }
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular',
            params: {},
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjc2YTYwNDU0MzdkODJjN2Y0ZDVmNTRkMjcxOTAzNCIsInN1YiI6IjYxNTg1YWJmNmY4ZDk1MDA0NDY4NGQ2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zasyxfU2KOgjkkwHEKkBgg7C3l8VAXGnxFBb_eprsdA',
            },
        };
        axios
            .request(options)
            .then((response) => {
                popular = response.data.results;
                resolve(response.data.results);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
let upcoming = []; //request limit workaround
const getUpcomingMovies = () => {
    return new Promise((resolve, reject) => {
        if (upcoming.length) {
            return resolve(upcoming);
        }
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/upcoming',
            params: {},
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjc2YTYwNDU0MzdkODJjN2Y0ZDVmNTRkMjcxOTAzNCIsInN1YiI6IjYxNTg1YWJmNmY4ZDk1MDA0NDY4NGQ2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zasyxfU2KOgjkkwHEKkBgg7C3l8VAXGnxFBb_eprsdA',
            },
        };
        axios
            .request(options)
            .then((response) => {
                upcoming = response.data.results;
                resolve(response.data.results);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

module.exports = {
    getMovieDetails,
    getMovieVideos,
    searchMovies,
    getPopularMovies,
    getUpcomingMovies,
};

// const getOmdbOptions = (params = {}) => {
//     return {
//         method: 'GET',
//         url: 'http://www.omdbapi.com/',
//         params: {apikey: '4d024597', ...params},
//     };
// };
