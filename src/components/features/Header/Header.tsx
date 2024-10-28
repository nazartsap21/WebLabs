import React, {FC} from 'react';
import "./Header.scss";
import {NavLink} from "react-router-dom";

const Header: FC = () => {
    return (
        <header>
            <h1>Relationz</h1>
            <nav className={"navigation"}>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/catalog"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Catalog
                        </NavLink>
                    </li>
                    <li><a href="/">Cart</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;