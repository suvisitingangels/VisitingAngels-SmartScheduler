// server/tests/db/connection.test.js

const mysql = require('mysql2');

// Create a connection pool. It's best practice to store sensitive information in environment variables.
const pool = mysql.createPool({
  host: "suvisitingangelsdb.caji6oq84asv.us-east-1.rds.amazonaws.com",     // e.g., 'localhost'
  user: "VAuser",     // e.g., 'root'
  password: "0aJo0AD#6#6{", // e.g., 'yourpassword'
  database: "suvisitingangels", // e.g., 'mydatabase'
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      process.exit(1);
    }
    console.log('Connected to MySQL successfully!');
    connection.release();
    process.exit(0);
  });
