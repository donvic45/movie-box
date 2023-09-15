import { useState, useEffect } from 'react';
import axios from 'axios';


function Carousel() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch the latest 3 movies from TMDb
        const fetchLatestMovies = async () => {
            try {
                const latestResponse = await axios.get(
                    'https://api.themoviedb.org/3/discover/movie',
                    {
                        params: {
                            api_key: '68c591fa810d7c3ab13d48edd19e20a8',
                            language: 'en-US',
                            page: 1,
                        },
                    }
                );
                const latestMovies = latestResponse.data.results.slice(0, 3);

                console.log('Latest Movies:', latestMovies);
                setMovies(latestMovies);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchLatestMovies();
    }, []);

    return (
        <div>
            
            <div id="top-5" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {movies.map((movie, index) => (
                        <div key={movie.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <div className="carousel-text">
                                <p className="movie-title">{movie.original_title}</p>
                                <div className="imdb-ratings">
                                    <img src="imdb.png" alt="" className="pr-1" /> {movie.vote_average} / 10
                                    <span className="spacer-35"></span>
                                    <img src="tomatoes.png" alt="" className="pr-1" /> {(movie.popularity/100).toFixed(2)}%
                                </div>
                                <p className="movie-desc">{movie.overview}</p>
                                <a className="btn btn-danger trailer-btn" href="/" role="button">
                                    <img src="Play.png" className="pr-2" alt="" />
                                    WATCH TRAILER
                                </a>
                            </div>
                            <img
                                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                                alt={movie.original_title}
                                className='carousel-img'
                            />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden"></span>
                </button>
            </div>
        </div>
    );
}

export default Carousel