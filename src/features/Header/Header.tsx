import React, {FC} from 'react';
import "./Header.scss";

const Header: FC = () => {
    return (
        <header>
            <h1>Relationz</h1>
            <nav className={"navigation"}>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Catalog</a></li>
                    <li><a href="/">Cart</a></li>
                </ul>
            </nav>

        </header>
    );
};

export default Header;