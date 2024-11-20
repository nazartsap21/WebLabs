import React from 'react';
import './FormError.scss';

interface FormErrorProps {
    message: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
    return <div className={"error-message"}>{message}</div>;
};

export default FormError;