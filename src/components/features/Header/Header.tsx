import React, {FC} from 'react';
import "./Header.scss";
import {Link, useLocation} from "react-router-dom";

const Header: FC = () => {
    const location = useLocation();
    console.log(location);
    return (
        <header>
            <h1>Relationz</h1>
            <nav className={"navigation"}>
                <ul>
                    <li><Link to="/" className={`${location.pathname === '/' ? 'active' : ''}`}>Home</Link></li>
                    <li><Link to="/catalog" className={`${location.pathname === '/catalog' ? 'active' : ''}`}>Catalog</Link></li>
                    <li><a href="/">Cart</a></li>
                </ul>
            </nav>

        </header>
    );
};

export default Header;