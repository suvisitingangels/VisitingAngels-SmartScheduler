// src/components/PrivateRoute.js

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation(); // To preserve the current location

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children; // Render protected content if token exists
};

export default PrivateRoute;
