// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const token    = localStorage.getItem('token');
  const location = useLocation();

  // 1) Not logged in at all → back to login
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  let payload;
  try {
    payload = jwtDecode(token);
  } catch (err) {
    // 2) Token invalid / malformed → drop it & back to login
    localStorage.removeItem('token');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 3) If we've been given roles, ensure this user's role is allowed
  if (
    Array.isArray(allowedRoles) &&
    allowedRoles.length > 0 &&
    !allowedRoles.includes(payload.role)
  ) {
    // you could also return a <Forbidden /> component here
    return <Navigate to="/" replace />;
  }

  // 4) All good!
  return children;
};

export default PrivateRoute;
