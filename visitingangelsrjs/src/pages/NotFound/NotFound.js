// src/pages/NotFound.js

/**
    *The NotFound.js file defines a simple React component that serves as the 404 error page, displayed whenever a user navigates to a non-existent route. 
    *It imports React and returns a basic message with an <h1> heading indicating a "404 - Page Not Found" error, followed by a paragraph apologizing for the missing page. 
    *This component is exported and used as a fallback in the main App.js file to handle undefined routes, providing a user-friendly response to invalid URLs.
*/

import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;
