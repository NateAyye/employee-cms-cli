const inquirer = require('inquirer');

async function init() {
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
}

(async () => {
  console.log(`
\x1b[36m ==============================\x1b[0m
Welcome to Your Employee Tracker
\x1b[36m ==============================\x1b[0m
`);

  await init();

  await inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
      },
    ])
    .then((answers) => {
      console.log(answers);
    });
})();
