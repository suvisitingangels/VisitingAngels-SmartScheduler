// server/app.js

/**
     * Server Entry Point
     * 
     * Initializes and starts the Express server for the application.
     * The server listens on the specified port and logs the URL once running.
*/

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
