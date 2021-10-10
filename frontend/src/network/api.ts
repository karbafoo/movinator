import axios from 'axios';
import {Log} from '../util/logger';
import GetUrl from './NETWORK_CONSTS';
let token = '';
export const GetImage = (name: string) => {
    return 'https://image.tmdb.org/t/p/w500/' + name;
};
export const Initiate = () => {
    const t = localStorage.getItem('@movinator/token');
    if (t) {
        token = t;
    } else {
        axios({
            method: 'GET',
            url: GetUrl('user/init'),
        })
            .then((res) => {
                if (res.data.data) {
                    token = res.data.data;
                    localStorage.setItem('@movinator/token', token);
                }
            })
            .catch((err) => {
                Log('Initiation Failed: ', err);
            });
    }
};

export const GetPopularMovies = (): Promise<any> =>
    axios({
        method: 'GET',
        url: GetUrl('movies/popular'),
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetUpcomingMovies = (): Promise<any> =>
    axios({
        method: 'GET',
        url: GetUrl('movies/upcoming'),
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

export const GetMovieDetails = (imdb_id: string): Promise<any> =>
    axios({
        method: 'GET',
        url: GetUrl('movies/get'),
        params: {imdb_id: imdb_id},
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

export const GetMovieVideos = (imdb_id: string): Promise<any> =>
    axios({
        method: 'GET',
        url: GetUrl('movies/videos'),
        params: {imdb_id: imdb_id},
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

export const SearchMovie = (keyword: string): Promise<any> =>
    axios({
        method: 'GET',
        url: GetUrl('movies/search'),
        params: {keyword: keyword},
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

export const MakeList = (listname: string): Promise<any> =>
    axios({
        method: 'POST',
        url: GetUrl('list/make'),
        data: {name: listname},
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const GetUserList = (): Promise<any> =>
    axios({
        method: 'GET',
        url: GetUrl('list/get'),
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

export const GetList = (list: string): Promise<any> =>
    axios({
        method: 'GET',
        url: GetUrl('list/get/' + list),
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });

export const AddToList = (listName: string, movie: MovieDB): Promise<any> =>
    axios({
        method: 'POST',
        url: GetUrl('list/add'),
        data: {
            list: listName,
            imdb_id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
        },
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
export const RemoveFromList = (
    listName: string,
    imdbID: string
): Promise<any> =>
    axios({
        method: 'POST',
        url: GetUrl('list/remove'),
        data: {list: listName, imdb_id: imdbID},
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    });
