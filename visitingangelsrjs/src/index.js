// src/index.js

/** 
    * The index.js file serves as the primary entry point for the React application, connecting the root App component to the HTML document. 
    * It imports the core React library, ReactDOM for rendering to the DOM, and the App component that defines the app’s structure and routing. 
    * Using ReactDOM.render(), it wraps App in <React.StrictMode> to highlight potential issues and mounts it to the <div id="root"> element in public/index.html, ensuring the app displays correctly in the browser. 
    * This file is essential for initializing the application and rendering it to the DOM.
*/


import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";



const root = createRoot(document.getElementById('root'));

root.render(
        <App />
);