/// <reference types="react-scripts" />

type MovieDB = {
    id: string;
    adult: boolean;
    genre_ids: number[];
    title: string;
    original_title: string;
    original_language: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    release_date: Date;
    vote_average: number;
    vote_count: number;

    production_countries: {name: string}[];
    status: string;
    tagline: string;
};

type MovieVideo = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: 1080;
    type: string;
    official: false;
    published_at: Date;
    id: string;
};
type List = {
    list: string;
    name: string;
    items: ListItem[];
    icon?: string;
};

type ListItem = {
    title: string;
    poster_path: string;
    imdb_id: string;
};
