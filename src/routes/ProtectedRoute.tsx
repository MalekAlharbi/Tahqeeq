import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute: React.FC = () => {
    const isAuth = useAuthStore((state) => state.isAuth);

    // if (isLoadingUser) {
    //     return (
    //         <div className="flex h-screen items-center justify-center bg-ui-surface text-ui-primaryText">
    //             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-ui-primary"></div>
    //             <span className="ms-3">جاري التحقق من الجلسة...</span>
    //         </div>
    //     );
    // }

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;