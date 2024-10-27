// src/pages/LoadData.js

/*
The LoadData.js file defines a simple React component for the "Load Data" page within the application. 
It imports React and returns a basic structure containing an <h1> heading labeled "Load Data" and a welcoming paragraph. 
This component is exported for use in App.js, where it’s assigned to the /loaddata route, allowing users to navigate to this page through the app's routing system.
*/

import React from 'react';

function LoadData() {
  return (
    <div>
      <h1>Load Data</h1>
      <p>Welcome to the Load Data page.</p>
    </div>
  );
}

export default LoadData;
