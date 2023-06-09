const inquirer = require('inquirer');
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bo0tc4mp!',
  database: 'employee_db',
});

(async () => {
  console.log(`
\x1b[36m ==============================\x1b[0m
Welcome to Your Employee Tracker
\x1b[36m ==============================\x1b[0m
`);
})();
