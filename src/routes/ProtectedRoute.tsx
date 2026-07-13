import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { useUser } from '../hooks/useUser';

const ProtectedRoute: React.FC = () => {
    const { isError } = useUser();
    const isAuth = useAuthStore((state) => state.isAuth);
    const zLogout = useAuthStore((state) => state.zLogout);

    useEffect(() => {
        if (isError) {
            zLogout();
        }
    }, [isError, zLogout]);

    if (isAuth && !isError) {
        return <Outlet />;
    }

    return <Navigate to="/" replace />;
};

export default ProtectedRoute;