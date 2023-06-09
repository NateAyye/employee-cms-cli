const inquirer = require('inquirer');

class CMS {
  constructor() {
    this.db = require('../config/connection');
  }
  async 'View All Employees'() {
    this.db
      .promise()
      .query('SELECT * FROM employees;')
      .then((results) => console.table(results[0]))
      .finally(async () => {
        await this.init();
      })
      .catch((err) => {
        throw err;
      });
  }
  'View All Employees By Department'() {
    // View All Employees By Department
    this.db
      .promise()
      .query(
        'SELECT departments.name AS department, JSON_ARRAYAGG(CONCAT(employees.first_name, " ", employees.last_name)) AS Employee FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id GROUP BY departments.name',
      )
      .then((results) => console.table(results[0]))
      .finally(async () => {
        await this.init();
      })
      .catch((err) => {
        throw err;
      });
  }
  'View All Employees By Manager'() {
    // View All Employees By Manager
    this.db
      .promise()
      .query(
        'SELECT CONCAT(m.first_name, " ", m.last_name) AS Manager, JSON_ARRAYAGG(CONCAT(e.first_name, " ", e.last_name)) AS Employee FROM employees e LEFT JOIN employees m ON e.manager_id = m.id GROUP BY m.id',
      )
      .then((results) => console.table(results[0]))
      .finally(async () => {
        await this.init();
      })
      .catch((err) => {
        throw err;
      });
  }
  'View All Departments'() {
    // View All Departments
    this.db
      .promise()
      .query('SELECT * FROM departments;')
      .then((results) => console.table(results[0]))
      .finally(async () => {
        await this.init();
      })
      .catch((err) => {
        throw err;
      });
  }
  'View All Roles'() {
    // View All Roles
    this.db
      .promise()
      .query('SELECT * FROM roles;')
      .then((results) => console.table(results[0]))
      .finally(async () => {
        await this.init();
      })
      .catch((err) => {
        throw err;
      });
  }
  'Add Employee'() {
    // Add Employee
    this.db
      .promise()
      .query('SELECT * FROM roles;')
      .then((results) => {
        const roles = results[0].map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'first_name',
              message: 'What is the employee first name?',
            },
            {
              type: 'input',
              name: 'last_name',
              message: 'What is the employee last name?',
            },
            {
              type: 'list',
              name: 'role_id',
              message: 'What is the employee role?',
              choices: roles,
            },
            {
              type: 'input',
              name: 'manager_id',
              message: 'What is the employee manager id?',
            },
          ])
          .then((answers) => {
            this.db
              .promise()
              .query('INSERT INTO employees SET ?', answers)
              .then((results) => {
                console.log(results);
              })
              .finally(async () => {
                await this.init();
              })
              .catch((err) => {
                throw err;
              });
          });
      });
  }
  'Add Role'() {
    // Add Role
    this.db
      .promise()
      .query('SELECT * FROM departments;')
      .then((results) => {
        const departments = results[0].map((department) => {
          return {
            name: department.name,
            value: department.id,
          };
        });
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'title',
              message: 'What is the role title?',
            },
            {
              type: 'input',
              name: 'salary',
              message: 'What is the role salary?',
            },
            {
              type: 'list',
              name: 'department_id',
              message: 'What is the role department?',
              choices: departments,
            },
          ])
          .then((answers) => {
            this.db
              .promise()
              .query('INSERT INTO roles SET ?', answers)
              .then((results) => {
                console.log(results);
              })
              .finally(async () => {
                await this.init();
              })
              .catch((err) => {
                throw err;
              });
          });
      });
  }
  'Add Department'() {}
  'Remove Department'() {}
  'Remove Employee'() {}
  'Remove Role'() {}
  'Update Employee Role'() {}
  'Update Employee Manager'() {}
  Quit() {
    console.log('Goodbye!');
    process.exit();
  }
  async init() {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'init',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'View All Employees By Department',
          'View All Employees By Manager',
          'View All Departments',
          'View All Roles',
          'Add Employee',
          'Add Role',
          'Add Department',
          'Remove Department',
          'Remove Employee',
          'Remove Role',
          'Update Employee Role',
          'Update Employee Manager',
          'Quit',
        ],
      },
    ]);
    console.log(answers);
    this[answers.init]();
  }
}

module.exports = CMS;
