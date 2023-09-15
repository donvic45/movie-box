import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Carousel from './Carousel';
import Card from './Card';
import Footer from './Footer';
import Nav from './Nav';

function Homepage() {
    return (
        <div>
            <Nav />
            <Carousel />
            <div class="main-content">
                <div class="d-flex justify-content-between mb-5 tag-line">
                    <p class="header-text">Featured Movie</p>
                    <a href="/" class="see-more"><span className='pr-2'>See More</span>  <img src="chevron.png" alt='' /></a>
                </div>
                <Card />
                <Footer />
            </div>
        </div>
    );

};

export default Homepage