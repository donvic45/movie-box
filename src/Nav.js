import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Nav({ logoSrc }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [itemClicked, setItemClicked] = useState(false);

    const searchResultsRef = useRef(null);

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

    const handleItemClick = () => {
        setItemClicked(true);
        setShowResults(false);

        setTimeout(() => {
            setItemClicked(false);
        }, 100);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close search results if clicked outside
            if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        const handleEscapeKey = (event) => {
            // Close search results on Esc key press
            if (event.key === 'Escape') {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);


        if (query.trim() === '') {
            setResults([]);
            setLoading(false);
            setShowResults(false);
            return;
        }

        const delayDebounce = setTimeout(fetchSearchResults, 500);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
            clearTimeout(delayDebounce);
        }
    }, [query]);



    return (
        <nav>
            <Link to={`/`}>
                <img src={logoSrc} alt="" className="header-logo" />
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

                    <div className={`search-results shadow ${showResults && !itemClicked ? '' : 'd-none'}`} ref={searchResultsRef}>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            results.map((movie) => (
                                <div className='search-card' key={movie.id} onClick={handleItemClick}>
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