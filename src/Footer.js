import React from 'react'

function Footer() {
    return (
        <footer className='row justify-content-center'>
            <div className='col text-center'>
                <div className='social-icons'>
                    <img className='icon-item' src='/fa-brands_facebook-square.png' alt='' />
                    <img className='icon-item' src='/fa-brands_instagram.png' alt='' />
                    <img className='icon-item' src='/fa-brands_twitter.png' alt='' />
                    <img className='icon-item' src='/fa-brands_youtube.png' alt='' />
                </div>
                <div className='footer-menu'>
                    <span className='footer-menu-item'>Conditions of Use</span>
                    <span className='footer-menu-item'>Privacy & Policy</span>
                    <span className='footer-menu-item'>Press Room</span>
                </div>
                <div className='copyright'>
                    <p>Copyright © 2023 MovieBox by Don Igwe</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer