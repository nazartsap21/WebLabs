import React from 'react';
import "./CheckoutForm.scss";
import {Formik, Form, Field} from "formik";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import FormError from "../../entities/FormError/FormError";

const CheckoutForm = () => {
    const navigate = useNavigate();
    const checkoutSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short Firstname!')
            .max(50, 'Too Long Firstname!')
            .required('Required Firstname'),
        lastName: Yup.string()
            .min(2, 'Too Short Lastname!')
            .max(50, 'Too Long Lastname!')
            .required('Required Lastname'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required email'),
        phone: Yup.string()
            .matches(/^[0-9]+$/, 'Invalid phone number')
            .min(10, 'Too Short Phone number!')
            .max(15, 'Too Long Phone number!')
            .required('Required Phone number'),
        address: Yup.string()
            .min(5, 'Too Short Address!')
            .max(50, 'Too Long Address!')
            .required('Required Address'),
    });

    const handleSubmit = () => {
        navigate('/success');
    }
    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: ''
            }}
            validationSchema={checkoutSchema}
            onSubmit={(values, { resetForm}) => {
                handleSubmit();
                resetForm();
            }}>
            {({errors, touched}) => (
                <Form className={"checkout-form"}>
                    <div className={'form-field'}>
                        <label htmlFor="firstName">First name</label>
                        <Field name="firstName" type="text"/>
                        {errors.firstName && touched.firstName && <FormError message={errors.firstName}/>}
                    </div>
                    <div className={'form-field'}>
                        <label htmlFor="lastName">Last name</label>
                        <Field name="lastName" type="text"/>
                        {errors.lastName && touched.lastName && <FormError message={errors.lastName}/>}
                    </div>
                    <div className={'form-field'}>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email"/>
                        {errors.email && touched.email && <FormError message={errors.email}/>}
                    </div>
                    <div className={'form-field'}>
                        <label htmlFor="phone">Phone</label>
                        <Field name="phone" type="text"/>
                        {errors.phone && touched.phone && <FormError message={errors.phone}/>}
                    </div>
                    <div className={'form-field'}>
                        <label htmlFor="address">Address</label>
                        <Field name="address" type="text"/>
                        {errors.address && touched.address && <FormError message={errors.address}/>}
                    </div>
                    <button type="submit" className={'submit-button'}>Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default CheckoutForm;