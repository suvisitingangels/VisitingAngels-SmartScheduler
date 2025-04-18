// server/server.js

/**
     * Server Entry Point
     * 
     * Initializes and starts the Express server for the application.
     * The server listens on the specified port and logs the URL once running.
*/

require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
}