import React from 'react';
import "./CheckoutPage.scss";
import CheckoutForm from "../../features/CheckoutForm/CheckoutForm";
import {Link, useNavigate} from "react-router-dom";

const CheckoutPage = () => {
    const navigate = useNavigate();
    return (
        <div className={"checkout-page"}>
            <CheckoutForm />
            <Link
                to={'..'}
                className={'back-button'}
                onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                }}
            >Go back</Link>
        </div>
    );
};

export default CheckoutPage;