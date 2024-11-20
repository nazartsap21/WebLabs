import React from 'react';
import './SuccessPage.scss';
import {Link} from "react-router-dom";
import successImage from '../../../assets/success1.png';

const SuccessPage = () => {
    return (
        <div className={'success-page'}>
            <img src={successImage} alt={'success'}/>
            <h1>Thank you for your order!</h1>
            <p>Your order is being processed.</p>
            <Link
                to={'/catalog'}
                className={'back-button'}
            >Go back to catalog</Link>
        </div>
    );
};

export default SuccessPage;