const inquirer = require('inquirer');
/***
 * @class CMS
 * @description This class is used to manage the CMS For an employee database using mysql and the mysql2 npm package
 * @method init
 */
class CMS {
  /***
   * @constructor
   * @description This constructor is used to initialize the CMS and reasks the user what they want to do
   */
  constructor() {
    this.db = require('../config/connection');
  }

  async 'View All Employees'() {
    this.db
      .promise()
      // First, query the database
      .query('SELECT * FROM employees;')
      // Then, display the results
      .then((results) => console.table(results[0]))
      // Finally, re-initialize the CMS
      .finally(async () => {
        await this.init();
      })
      // Catch any errors that occur
      .catch((err) => {
        throw err;
      });
  }
  'View All Employees By Department'() {
    // View All Employees By Department
    this.db
      .promise()
      // First, query the database for all departments and their employees
      .query(
        'SELECT departments.name AS department, JSON_ARRAYAGG(CONCAT(employees.first_name, " ", employees.last_name)) AS Employee FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id GROUP BY departments.name',
      )
      // Then, display the results in a table
      .then((results) => console.table(results[0]))
      // Finally, re-initialize the CMS
      .finally(async () => {
        await this.init();
      })
      // Catch any errors that occur
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
      // First, query the database for all roles
      .query('SELECT * FROM roles;')
      .then((results) => {
        // Then, create a new array of roles with the name and value
        const roles = results[0].map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
        // Then, prompt the user for the employee information
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
          // Then, insert the new employee into the database with the user's answers
          .then((answers) => {
            this.db
              .promise()
              .query('INSERT INTO employees SET ?', answers)
              .then((results) => {
                console.log('✅ Employee Added!');
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
      // First, query the database for all departments
      .query('SELECT * FROM departments;')
      .then((results) => {
        // Then, create a new array of departments with the name and value
        const departments = results[0].map((department) => {
          return {
            name: department.name,
            value: department.id,
          };
        });
        // Then, prompt the user for the role information
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
          // Then, insert the new role into the database with the user's answers
          .then((answers) => {
            this.db
              .promise()
              .query('INSERT INTO roles SET ?', answers)
              .then((results) => {
                console.log('✅ Role Added!');
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
  'Add Department'() {
    // Add Department
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the department name?',
        },
      ])
      .then((answers) => {
        this.db
          .promise()
          .query('INSERT INTO departments SET ?', answers)
          .then((results) => {
            console.log('✅ Department Added!');
          })
          .finally(async () => {
            await this.init();
          })
          .catch((err) => {
            throw err;
          });
      });
  }
  'Remove Department'() {
    // Remove Department
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
              type: 'list',
              name: 'id',
              message: 'What is the department id?',
              choices: departments,
            },
          ])
          .then((answers) => {
            this.db
              .promise()
              .query('DELETE FROM departments WHERE ?', answers)
              .then((results) => {
                console.log('✅ Department Removed!');
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
  'Remove Employee'() {
    // Remove Employee
    this.db
      .promise()
      .query('SELECT * FROM employees;')
      .then((results) => {
        const employees = results[0].map((employee) => {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          };
        });
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'id',
              message: 'What is the employee id?',
              choices: employees,
            },
          ])
          .then((answers) => {
            this.db
              .promise()
              .query('DELETE FROM employees WHERE ?', answers)
              .then((results) => {
                console.log('✅ Employee Removed!');
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
  'Remove Role'() {
    // Remove Role
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
              type: 'list',
              name: 'id',
              message: 'What is the role id?',
              choices: roles,
            },
          ])
          .then((answers) => {
            this.db
              .promise()
              .query('DELETE FROM roles WHERE ?', answers)
              .then((results) => {
                console.log('✅ Role Removed!');
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
  'Update Employee Role'() {
    // Update Employee Role
    this.db
      .promise()
      .query('SELECT * FROM employees;')
      .then(async (results) => {
        const employees = results[0].map((employee) => {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          };
        });
        const rolesDb = await this.db.promise().query('SELECT * FROM roles;');
        const roles = rolesDb[0].map((role) => {
          return {
            name: role.title,
            value: role.id,
          };
        });
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'id',
              message: 'What is the employee id?',
              choices: employees,
            },
            {
              type: 'list',
              name: 'role_id',
              message: 'What is the employee role?',
              choices: roles,
            },
          ])
          .then((answers) => {
            this.db
              .promise()
              .query('UPDATE employees SET ? WHERE ?', [
                { role_id: answers.role_id },
                { id: answers.id },
              ])
              .then((results) => {
                console.log('✅ Employee role updated!');
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
  'Update Employee Manager'() {
    // Update Employee Manager
    this.db
      .promise()
      .query('SELECT * FROM employees;')
      .then((results) => {
        const employees = results[0].map((employee) => {
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          };
        });
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'id',
              message: 'What is the employee id?',
              choices: employees,
            },
            {
              type: 'list',
              name: 'manager_id',
              message: 'Who is the employee manager?',
              choices: employees,
            },
          ])
          .then((answers) => {
            this.db
              .promise()
              .query('UPDATE employees SET ? WHERE ?', [
                { manager_id: answers.manager_id },
                { id: answers.id },
              ])
              .then((results) => {
                console.log('✅ Employee manager updated!');
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
  Quit() {
    console.log('\x1B[33m Goodbye!');
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
    this[answers.init]();
  }
}

module.exports = CMS;
