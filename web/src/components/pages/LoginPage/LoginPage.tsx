import React from 'react';
import './LoginPage.scss';
import LoginForm from "../../features/LoginForm/LoginForm";
import {Link} from "react-router-dom";

const LoginPage = () => {
    return (
        <div className={'login-page'}>
            <h1>Login</h1>
            <LoginForm/>
            <h3>Dont have account? <Link to={'/register'}>Register</Link></h3>
        </div>
    );
};

export default LoginPage;