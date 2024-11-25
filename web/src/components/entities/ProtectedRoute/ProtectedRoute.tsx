import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthServices from '../../../services/AuthServices';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../store/store.config";
import {checkToken, logout} from "../../../store/authSlice";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation();
    const [valid, setValid] = useState<boolean | null>(null);
    const token = localStorage.getItem('token');

    // useEffect(() => {
    //     dispatch(checkToken({token}))
    // }, []);

    useEffect(() => {
        if (token) {
            dispatch(checkToken({ token }))
                .unwrap()
                .then((res) => {
                    setValid(res.data.valid);
                })
                .catch(() => {
                    setValid(false);
                    dispatch(logout());
                });
        } else {
            setValid(false);
            dispatch(logout());
        }
    }, [token, dispatch]);

    if (valid === null) {
        return <div>Loading...</div>;
    }

    if (!valid) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;