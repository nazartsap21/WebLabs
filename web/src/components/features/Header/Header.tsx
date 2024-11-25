import React, {FC, useEffect, useState} from 'react';
import "./Header.scss";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store.config";
import {logout} from "../../../store/authSlice";

const Header: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const auth = useSelector((state: RootState) => state.authReducer);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
    }

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
                    <li>
                        <NavLink
                            to="/cart"
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            Cart
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={"auth"}>
                <ul>
                    {!auth.isAuth &&
                        <>
                            <li>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) => isActive ? 'active' : ''}
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) => isActive ? 'active' : ''}
                                >
                                     Register
                                </NavLink>
                             </li>
                        </>}
                    {auth.isAuth &&
                        <li>
                            <NavLink
                                to="/login"
                                className={({isActive}) => isActive ? 'active' : ''}
                                onClick={handleLogout}
                            >
                                Logout
                            </NavLink>
                        </li>
                    }
                </ul>
            </div>
        </header>
    );
};

export default Header;