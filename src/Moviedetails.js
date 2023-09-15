import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Nav from './Nav';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Moviedetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch movie details for the specified ID
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}`,
                    {
                        params: {
                            api_key: '68c591fa810d7c3ab13d48edd19e20a8',
                            language: 'en-US',
                        },
                    }
                );
                console.log('Movie Details:', response.data);
                setMovie(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                setLoading(false);
            }
        };

        fetchMovieDetails()

    }, [id]);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <div className="details-nav">
                        <nav>
                            <Link to={`/`}>
                                <img src="/Logo-black.png" alt="" className="header-logo" />
                            </Link>
                            <input type="text" className="searchbar" placeholder="What do you want to watch next?" />
                            <div>
                                <ul className="nav">
                                    <li className="nav-item">Sign in</li>
                                    <li className="nav-item">
                                        <img src="Menu.png" alt="" />
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className="details-page">
                        <div className="details-poster-div shadow">
                            <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.original_title} />
                        </div>
                        <div className="details-main-contents">
                            <div className="d-flex justify-content-between">
                                <div className="details-first-div">
                                    <span className="details-movie-title">{movie.original_title}</span> &nbsp;• &nbsp;
                                    <span className="details-release-date">{new Date(movie.release_date).getFullYear()}</span> &nbsp;• &nbsp;
                                    <span className="details-runtime">{(movie.runtime)} mins</span>
                                </div>
                                <div className="details-imdb-ratings">
                                    <img src="/imdb.png" alt="" className="pr-1" /> {movie.vote_average} / 10
                                    <span className='spacer-35'></span>
                                    <img src="/tomatoes.png" alt="" className="pr-1" /> {(movie.popularity / 100).toFixed(2)}%
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <p className="movie-desc">{movie.overview}</p>
                                    <div className="details-cast">
                                        <p>Director: <span className='red-text'>Joseph Kosinski</span></p>
                                        <p>Writers: <span className='red-text'>Jim Cash, Jack Epps Jr, Peter Craig</span></p>
                                        <p>Stars: <span className='red-text'> Tom Cruise, Jennifer Connelly, Miles Teller</span></p>
                                    </div>
                                    <a className="btn btn-danger trailer-btn" href="/" role="button">Top rated movie #65</a>
                                </div>
                                <div className="col-md-3 aside">
                                    <a className="btn btn-danger trailer-btn showtime mb-2" href="/" role="button">See Showtimes</a>
                                    <a className="btn btn-danger trailer-btn more-watch" href="/" role="button">More watch options</a>
                                    <img alt='top rated' className='mt-3 top-rated' src='/top-3-movies.png' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Moviedetails;