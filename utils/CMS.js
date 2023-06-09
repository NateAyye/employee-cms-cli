const inquirer = require('inquirer');

class CMS {
  constructor() {
    this.db = require('../config/connection');
  }
  async 'View All Employees'() {
    this.db
      .promise()
      .query('SELECT * FROM employee')
      .then((results) => console.table(results[0]))
      .finally(async () => {
        await this.init();
      })
      .catch((err) => {
        throw err;
      });
  }
  'View All Employees By Department'() {}
  'View All Employees By Manager'() {}
  'View All Departments'() {}
  'View All Roles'() {}
  'Add Employee'() {}
  'Add Role'() {}
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
