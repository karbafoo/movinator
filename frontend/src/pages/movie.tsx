import {useRef} from 'react';
import {useParams} from 'react-router-dom';
import {Container, Header, Label} from 'semantic-ui-react';
import {useGetMovieDetails, useGetMovieVideos} from '../hook/Movie';
import {Loading} from '../components/Loading';
const MoviePage = () => {
    const {mid} = useParams<any>();
    const videoRef = useRef<HTMLDivElement>(null);
    const [movieDetails, movieDetailsLoading, movieDetailsErr] =
        useGetMovieDetails(mid);
    const [movieVideos, movieVideosLoading, movieVideosErr] =
        useGetMovieVideos(mid);

    const video =
        movieVideos &&
        movieVideos.find((m) => m.site.toLocaleLowerCase() === 'youtube');

    return (
        <Container>
            <div
                className="video-container"
                ref={videoRef}
                style={{
                    height:
                        videoRef && videoRef.current
                            ? //@ts-ignore
                              (videoRef.current.offsetWidth * 9) / 16
                            : '20rem',
                }}
            >
                {movieVideosLoading ? <Loading /> : null}
                {movieVideosErr ? (
                    <p className="error">{movieVideosErr.toString()}</p>
                ) : null}
                {video ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video?.key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : !movieVideosLoading ? (
                    <p className="error">No videos found</p>
                ) : null}
            </div>
            {movieDetailsErr ? (
                <p className="error">{movieDetailsErr.toString()}</p>
            ) : null}
            {!movieDetailsLoading ? (
                <div style={{marginTop: 24}}>
                    <Header inverted>
                        {movieDetails?.title}
                        <Label>{movieDetails?.status}</Label>
                        <Header.Subheader>
                            {movieDetails?.tagline}
                        </Header.Subheader>
                    </Header>
                    <p>{movieDetails?.overview}</p>
                    <p>{`Production Countries: ${movieDetails?.production_countries
                        ?.map((i) => i.name)
                        .join(' ,')}`}</p>
                </div>
            ) : null}
        </Container>
    );
};

export default MoviePage;
