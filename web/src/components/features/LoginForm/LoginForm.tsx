import React from 'react';
import './LoginForm.scss';
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import FormError from "../../entities/FormError/FormError";
import { useDispatch } from "react-redux";
import { login } from "../../../store/authSlice";
import { AppDispatch } from "../../../store/store.config";
import { unwrapResult } from '@reduxjs/toolkit';
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const checkoutSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password: Yup.string()
            .min(8, 'Too Short (at least 8)!')
            .max(50, 'Too Long!')
            .required('Required'),
    });

    const handleSubmit = async (values: { username: string, password: string }) => {
        try {
            const resultAction = await dispatch(login(values));
            const result = unwrapResult(resultAction);
            localStorage.setItem('token', result.data.token);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Formik
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={checkoutSchema}
            onSubmit={(values, { resetForm }) => {
                handleSubmit(values);
                resetForm();
            }}>
            {({ errors, touched }) => (
                <Form className={"login-form"}>
                    <div className={'form-field'}>
                        <label htmlFor="username">Username</label>
                        <Field name="username" type="text" />
                        {errors.username && touched.username && <FormError message={errors.username} />}
                    </div>
                    <div className={'form-field'}>
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" />
                        {errors.password && touched.password && <FormError message={errors.password} />}
                    </div>
                    <button type="submit" className={'submit-button'}>Login</button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;