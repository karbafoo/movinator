import React from 'react';

import {GitcoinContext} from '../store';
import {Container, Input} from 'semantic-ui-react';
import {useGetPopular, useGetMovieSearch} from '../hook/Movie';
import {AddToList, GetImage, RemoveFromList} from '../network/api';
import {useGetFavs, useGetWatchLater} from '../hook/List';
import AddToListModal from './../components/AddToList.modal';
import NewListModal from '../components/NewList.modal';
import {Loading} from '../components/Loading';
import {ACTIONS} from '../store/ACTIONS';
import {useHistory} from 'react-router-dom';
import {Log} from '../util/logger';
import {useGetUpcoming} from './../hook/Movie';

const HomePage = () => {
    const [keyword, setKeyword] = React.useState('');
    const [favTrigger, setFavTrigger] = React.useState(false);
    const [wTrigger, setWTrigger] = React.useState(false);
    const [favs] = useGetFavs(favTrigger);
    const [watchLaters] = useGetWatchLater(wTrigger);
    const [popularMovies, popularMoviesLoading, popularMoviesErr] =
        useGetPopular();
    const [upcomingMovies, upcomingMoviesLoading, upcomingMoviesErr] =
        useGetUpcoming();
    const [searchedMovies, searchLoading, searchErr] =
        useGetMovieSearch(keyword);
    const onTriggerFavs = () => {
        setFavTrigger(!favTrigger);
    };
    const onTriggerWatchLater = () => {
        setWTrigger(!wTrigger);
    };
    const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };

    return (
        <Container>
            <div className="search">
                <Input
                    value={keyword}
                    onChange={onKeywordChange}
                    placeholder="Search by title"
                />
            </div>
            {keyword && keyword.trim().length > 0 ? (
                <div>
                    <MovieSection
                        loading={searchLoading}
                        err={searchErr}
                        title={'Search Results'}
                        movies={searchedMovies}
                        favs={favs}
                        watchLaters={watchLaters}
                        onTriggerFavs={onTriggerFavs}
                        onTriggerWatchLater={onTriggerWatchLater}
                    />
                </div>
            ) : (
                <div>
                    <MovieSection
                        loading={upcomingMoviesLoading}
                        err={upcomingMoviesErr}
                        title={'Upcoming Movies'}
                        movies={upcomingMovies}
                        favs={favs}
                        watchLaters={watchLaters}
                        onTriggerFavs={onTriggerFavs}
                        onTriggerWatchLater={onTriggerWatchLater}
                    />{' '}
                    <MovieSection
                        loading={popularMoviesLoading}
                        err={popularMoviesErr}
                        title={'Popular Movies'}
                        movies={popularMovies}
                        favs={favs}
                        watchLaters={watchLaters}
                        onTriggerFavs={onTriggerFavs}
                        onTriggerWatchLater={onTriggerWatchLater}
                    />
                </div>
            )}

            <AddToListModal />
            <NewListModal />
        </Container>
    );
};

export default HomePage;

const MovieSection = ({
    title,
    loading,
    err,
    movies,
    favs,
    watchLaters,
    onTriggerFavs,
    onTriggerWatchLater,
}: {
    title: string;
    loading: boolean;
    err: string;
    movies: MovieDB[];
    favs: List | null;
    watchLaters: List | null;
    onTriggerFavs: () => void;
    onTriggerWatchLater: () => void;
}) => {
    const history = useHistory();
    const {dispatch} = React.useContext(GitcoinContext);
    const [showMore, setShowMore] = React.useState(false);
    const isFaved = (id: string) =>
        favs &&
        favs.items.findIndex((i) => i.imdb_id.toString() === id.toString()) >
            -1;
    const isInWatchLater = (id: string) =>
        watchLaters &&
        watchLaters.items.findIndex(
            (i) => i.imdb_id.toString() === id.toString()
        ) > -1;

    const onToggleFavList = (movie: MovieDB) => {
        if (isFaved(movie.id)) {
            RemoveFromList('fav', movie.id)
                .then((res) => {
                    onTriggerFavs();
                    Log('res', res);
                })
                .catch((err) => {
                    Log('err', err);
                });
        } else {
            AddToList('fav', movie)
                .then((res) => {
                    onTriggerFavs();
                    Log('res', res);
                })
                .catch((err) => {
                    Log('err', err);
                });
        }
    };
    const onToggleWatchLaterList = (movie: MovieDB) => {
        if (isInWatchLater(movie.id)) {
            RemoveFromList('watchlater', movie.id)
                .then((res) => {
                    onTriggerWatchLater();
                    Log('res', res);
                })
                .catch((err) => {
                    Log('err', err);
                });
        } else {
            AddToList('watchlater', movie)
                .then((res) => {
                    onTriggerWatchLater();
                    Log('res', res);
                })
                .catch((err) => {
                    Log('err', err);
                });
        }
    };
    const onAddToList = (movie: MovieDB) => {
        dispatch({
            type: ACTIONS.SET_SELECTED_MOVIE,
            payload: movie,
        });
        dispatch({
            type: ACTIONS.SET_ADD_TO_LIST_MODAL_VISIBLITY,
            payload: true,
        });
    };
    return (
        <div className={'movie-section'}>
            <div className={'movie-section-header'}>{title}</div>
            {err ? <p className="error">{err.toString()}</p> : null}
            <div className={'movie-card-wrapper'}>
                {loading ? <Loading /> : null}
                {movies
                    ? movies
                          .slice(
                              0,
                              showMore ? movies.length : movies.length / 2 - 2
                          )
                          .map((movie, i) => (
                              <div className={'movie-card'} key={i}>
                                  <div className={'movie-card-poster'}>
                                      <img
                                          src={GetImage(movie.poster_path)}
                                          alt={movie.original_title}
                                      />
                                      <div className={'movie-card-actionbar'}>
                                          <p>{movie.vote_average}</p>
                                          <span
                                              className="fav-btn"
                                              onClick={() =>
                                                  onToggleFavList(movie)
                                              }
                                          >
                                              {isFaved(movie.id) ? '⭐' : '☆'}
                                          </span>
                                      </div>
                                  </div>
                                  <div className={'movie-card-title'}>
                                      <p>{movie.title}</p>
                                      <div className="list-actions">
                                          <div
                                              onClick={() =>
                                                  onToggleWatchLaterList(movie)
                                              }
                                              className={
                                                  isInWatchLater(movie.id)
                                                      ? 'gold'
                                                      : ''
                                              }
                                          >
                                              Watch Later
                                          </div>
                                          <div
                                              onClick={() => onAddToList(movie)}
                                          >
                                              ...
                                          </div>
                                      </div>
                                      <div
                                          className="list-actions"
                                          onClick={() =>
                                              history.push(`/movie/${movie.id}`)
                                          }
                                      >
                                          <div>DETAILS</div>
                                      </div>
                                  </div>
                              </div>
                          ))
                    : null}
            </div>
            <div className={'movie-section-more'}>
                {!showMore ? (
                    <button
                        className="btn red"
                        onClick={() => setShowMore(true)}
                    >
                        MORE
                    </button>
                ) : null}
            </div>
        </div>
    );
};
