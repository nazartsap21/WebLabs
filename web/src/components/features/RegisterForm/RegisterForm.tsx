import React from 'react';
import './RegisterForm.scss';
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import FormError from "../../entities/FormError/FormError";
import {AppDispatch} from "../../../store/store.config";
import {useDispatch} from "react-redux";
import authServices from "../../../services/AuthServices";
import {login} from "../../../store/authSlice";
import {unwrapResult} from "@reduxjs/toolkit";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const checkoutSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Too Short (at least 8)!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const handleSubmit = (values: {username: string, email: string, password: string}) => {
        authServices.register(values.username, values.email, values.password).then(async () => {
            const resultAction = await dispatch(login(values));
            const result = unwrapResult(resultAction);
            localStorage.setItem('token', result.data.token);
            setTimeout(() => {
                navigate('/');
            }, 100);
        });
    }
    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: ''
            }}
            validationSchema={checkoutSchema}
            onSubmit={(values, { resetForm}) => {
                handleSubmit(values);
                resetForm();
            }}>
            {({errors, touched}) => (
                <Form className={"register-form"}>
                    <div className={'form-field'}>
                        <label htmlFor="username">Username</label>
                        <Field name="username" type="text"/>
                        {errors.username && touched.username && <FormError message={errors.username}/>}
                    </div>
                    <div className={'form-field'}>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email"/>
                        {errors.email && touched.email && <FormError message={errors.email}/>}
                    </div>
                    <div className={'form-field'}>
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password"/>
                        {errors.password && touched.password && <FormError message={errors.password}/>}
                    </div>
                    <button type="submit" className={'submit-button'}>Register</button>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterForm;