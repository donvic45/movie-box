import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Nav() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie`,
                {
                    params: {
                        api_key: '68c591fa810d7c3ab13d48edd19e20a8',
                        language: 'en-US',
                        query: query,
                    },
                }
            );
            const searchData = response.data.results;

            setResults(searchData);
            setLoading(false);

            // Show the results when data is available
            setShowResults(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setLoading(false);
        }
    };

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            fetchSearchResults();
        }
    };

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            setLoading(false);
            setShowResults(false);
            return;
        }

        const delayDebounce = setTimeout(fetchSearchResults, 500);

        return () => clearTimeout(delayDebounce);
    }, [query]);



    return (
        <nav>
            <Link to={`/`}>
                <img src="/Logo.png" alt="" className="header-logo" />
            </Link>
            <div>
                <div>
                    <input
                        type="text"
                        className="searchbar"
                        placeholder="What do you want to watch next?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={handleKeyUp}
                    />

                    <div className={`search-results shadow ${showResults ? '' : 'd-none'}`}>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            results.map((movie) => (
                                <div className='search-card' key={movie.id}>
                                    <Link to={`/movies/${movie.id}`}>
                                        <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} className='shadow movie-poster img-fluid' alt="" data-test-id="movie-poster" />
                                    </Link>
                                    <h2>{movie.title}</h2>
                                    <p>{movie.release_date}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div>
                <ul className="nav">
                    <li className="nav-item">Sign in</li>
                    <li className="nav-item">
                        <img src="Menu.png" alt="" />
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav