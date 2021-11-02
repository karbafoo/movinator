import {useMemo, useState} from 'react';
import {GetList, GetUserList} from '../network/api';
import {Log} from '../util/logger';

export const useGetUsersLists = (trigger: boolean): [List[], boolean, any] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<any>(null);
    const [movies, setMovies] = useState<List[]>([]);
    console.log('trigger', trigger);
    useMemo(() => {
        setErr(null);
        setLoading(true);
        setMovies([]);

        GetUserList()
            .then((res) => {
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
    }, [trigger]);
    return [movies, loading, err];
};

export const useGetFavs = (
    favTrigger: boolean
): [List | null, boolean, any] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<any>(null);
    const [movies, setMovies] = useState<List | null>(null);

    useMemo(() => {
        setErr(null);
        setLoading(true);
        setMovies(null);

        GetList('fav')
            .then((res) => {
                setErr(null);
                setLoading(false);
                setMovies(res.data.data);
            })
            .catch((err) => {
                Log('err', err);
                setErr(err);
                setLoading(false);
                setMovies(null);
            });
    }, [favTrigger]);
    return [movies, loading, err];
};

export const useGetWatchLater = (
    favTrigger: boolean
): [List | null, boolean, any] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<any>(null);
    const [movies, setMovies] = useState<List | null>(null);

    useMemo(() => {
        setErr(null);
        setLoading(true);
        setMovies(null);

        GetList('watchlater')
            .then((res) => {
                setErr(null);
                setLoading(false);
                setMovies(res.data.data);
            })
            .catch((err) => {
                Log('err', err);
                setErr(err);
                setLoading(false);
                setMovies(null);
            });
    }, [favTrigger]);
    return [movies, loading, err];
};

export const useGetList = (
    listName: string,
    trigger: boolean
): [List | null, boolean, any] => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<any>(null);
    const [movies, setMovies] = useState<List | null>(null);

    useMemo(() => {
        setErr(null);
        setLoading(true);
        setMovies(null);
        if (!listName) return;
        GetList(listName)
            .then((res) => {
                setErr(null);
                setLoading(false);
                setMovies(res.data.data);
            })
            .catch((err) => {
                Log('err', err);
                setErr(err);
                setLoading(false);
                setMovies(null);
            });
    }, [listName, trigger]);
    return [movies, loading, err];
};
