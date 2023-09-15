import React from 'react'

function Nav() {
    return (
        <nav>
            <img src="Logo.png" alt="" className="header-logo" />
            <input type="text" className="searchbar" placeholder="What do you want to watch next?"/>
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