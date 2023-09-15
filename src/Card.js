import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Card() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState({});
    const [likedMovies, setLikedMovies] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/genre/movie/list',
                    {
                        params: {
                            api_key: '68c591fa810d7c3ab13d48edd19e20a8',
                            language: 'en-US',
                        },
                    }
                );
                // Create a genre mapping object (ID -> Name)
                const genreMapping = {};
                response.data.genres.forEach((genre) => {
                    genreMapping[genre.id] = genre.name;
                });
                setGenres(genreMapping);
            } catch (error) {
                console.error('Error fetching genre data:', error);
            }
        };

        fetchGenres()

        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/discover/movie',
                    {
                        params: {
                            api_key: '68c591fa810d7c3ab13d48edd19e20a8',
                            language: 'en-US',
                            page: 1,
                        },
                    }
                );
                // console.log('RES IS', response)
                setMovies(response.data.results.slice(0, 12));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleLikeClick = (movieId) => {
        if (likedMovies.includes(movieId)) {
            setLikedMovies(likedMovies.filter((id) => id !== movieId));
        } else {
            setLikedMovies([...likedMovies, movieId]);
        }
    };
    return (
        <div className='movies row'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                movies.map((movie) => (
                    <div className="col-md-3 movie-card" key={movie.id} data-test-id="movie-card">

                        <div className="mb-1 position-relative">
                            <div className="like-btn" onClick={() => handleLikeClick(movie.id)} data-test-id="like-button" >
                                <img src={likedMovies.includes(movie.id) ? 'heart-liked.png' : 'heart-unliked.png'} alt='' />
                            </div>
                            <Link to={`/movies/${movie.id}`}>
                                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className='shadow movie-poster img-fluid' alt="" data-test-id="movie-poster" />
                            </Link>
                        </div>
                        <span className="small-text location" data-test-id="movie-release-date">{movie.release_date}</span>
                        <p className="movie-title mb-0" data-test-id="movie-title">{movie.original_title}</p>
                        <div className="imdb-ratings d-flex justify-content-between">
                            <span><img src="imdb.png" alt="" className="inline-img pr-1" />{`${movie.vote_average * 10} / 100`}</span>
                            <span><img src="tomatoes.png" alt="" className="inline-img pr-1" /> {(movie.popularity / 100).toFixed(2)}%</span>
                        </div>
                        <div className="small-text genre">{movie.genre_ids.map((genreId) => genres[genreId]).join(', ')}</div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Card