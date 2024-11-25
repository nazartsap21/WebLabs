import React from 'react';
import './RegisterPage.scss';
import RegisterForm from "../../features/RegisterForm/RegisterForm";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    return (
        <div className={'register-page'}>
            <h1>Register</h1>
            <RegisterForm />
            <h3>Already registered? <Link to={'/login'}>Login</Link></h3>
        </div>
    );
};

export default RegisterPage;