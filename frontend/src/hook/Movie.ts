import {useMemo, useState} from 'react';
import {
    GetUpcomingMovies,
    GetMovieDetails,
    GetMovieVideos,
    GetPopularMovies,
    SearchMovie,
} from '../network/api';
import {Log} from '../util/logger';

let timer: NodeJS.Timeout;
export const useGetMovieSearch = (
    keyword: string
): [MovieDB[], boolean, any] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<any>(null);
    const [movies, setMovies] = useState<MovieDB[]>([]);

    useMemo(() => {
        setErr(null);
        setLoading(true);
        setMovies([]);

        if (!keyword) {
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            SearchMovie(keyword)
                .then((res) => {
                    Log('res', res);
                    setErr(null);
                    setLoading(false);
                    setMovies(res.data.data);
                })
                .catch((err) => {
                    Log('err', err);
                    setErr(err);
                    setLoading(false);
                    setMovies([]);
                });
        }, 500);

        return () => clearTimeout(timer);
    }, [keyword]);
    return [movies, loading, err];
};

export const useGetPopular = (): [MovieDB[], boolean, any] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<any>(null);
    const [movies, setMovies] = useState<MovieDB[]>([]);

    useMemo(() => {
        setLoading(true);
        GetPopularMovies()
            .then((res) => {
                setErr(null);
                setLoading(false);
                setMovies(res.data.data);
            })
            .catch((err) => {
                setErr(err);
                setLoading(false);
                setMovies([]);
            });
    }, []);
    return [movies, loading, err];
};

export const useGetUpcoming = (): [MovieDB[], boolean, any] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<any>(null);
    const [movies, setMovies] = useState<MovieDB[]>([]);

    useMemo(() => {
        setLoading(true);
        GetUpcomingMovies()
            .then((res) => {
                setErr(null);
                setLoading(false);
                setMovies(res.data.data);
            })
            .catch((err) => {
                setErr(err);
                setLoading(false);
                setMovies([]);
            });
    }, []);
    return [movies, loading, err];
};

export const useGetMovieVideos = (
    mid: string
): [MovieVideo[], boolean, any] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<any>(null);
    const [movies, setMovies] = useState<MovieVideo[]>([]);

    useMemo(() => {
        setErr(null);
        setLoading(false);
        setMovies([]);
        if (!mid) {
            return;
        }
        setLoading(true);
        GetMovieVideos(mid)
            .then((res) => {
                setErr(null);
                setLoading(false);
                setMovies(res.data.data.results);
            })
            .catch((err) => {
                setErr(err);
                setLoading(false);
                setMovies([]);
            });
    }, []);
    return [movies, loading, err];
};

export const useGetMovieDetails = (
    mid: string
): [MovieDB | null, boolean, any] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<any>(null);
    const [movieDetails, setMovieDetails] = useState<MovieDB | null>(null);

    useMemo(() => {
        setErr(null);
        setLoading(false);
        setMovieDetails(null);
        if (!mid) {
            return;
        }
        setLoading(true);
        GetMovieDetails(mid)
            .then((res) => {
                setErr(null);
                setLoading(false);
                setMovieDetails(res.data.data);
            })
            .catch((err) => {
                setErr(err);
                setLoading(false);
                setMovieDetails(null);
            });
    }, []);
    return [movieDetails, loading, err];
};
