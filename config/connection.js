const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bo0tc4mp!',
  database: 'employee_db',
});

module.exports = connection;
