// src/index.js

/** 
    * The index.js file serves as the primary entry point for the React application, connecting the root App component to the HTML document. 
    * It imports the core React library, ReactDOM for rendering to the DOM, and the App component that defines the app’s structure and routing. 
    * Using ReactDOM.render(), it wraps App in <React.StrictMode> to highlight potential issues and mounts it to the <div id="root"> element in public/index.html, ensuring the app displays correctly in the browser. 
    * This file is essential for initializing the application and rendering it to the DOM.
*/


import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Auth0ProviderWithNavigate from "./pages/Auth/Auth0ProviderWithNavigate";

import { Auth0Provider } from "@auth0/auth0-react";

// Render the app to the DOM

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
// const redirectUri = process.env.REACT_APP_AUTH0_CALLBACK_URL;

console.log("Auth0 Domain:", process.env.REACT_APP_AUTH0_DOMAIN);
console.log("Auth0 Client ID:", process.env.REACT_APP_AUTH0_CLIENT_ID);
console.log("Auth0 Redirect URI:", process.env.REACT_APP_AUTH0_CALLBACK_URL);


const root = createRoot(document.getElementById('root'));

root.render(
    <Auth0Provider
        domain={ domain }
        clientId={ clientId }
        authorizationParams={{
            redirect_uri: "http://localhost:3000/scheduler"
        }}
    >
        <App />
    </Auth0Provider>,
);