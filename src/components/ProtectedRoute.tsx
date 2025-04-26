
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireAuth = true 
}) => {
  const { state } = useApp();
  const { isLoggedIn } = state;
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  // If we're on the login page but already logged in, redirect to landing
  if (isLoginPage && isLoggedIn) {
    return <Navigate to="/landing" replace />;
  }

  // If we require auth but not logged in, redirect to login
  if (requireAuth && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If we don't require auth but are logged in, continue (like for landing page)
  return <>{children}</>;
};

export default ProtectedRoute;
