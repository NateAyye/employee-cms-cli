const CMS = require('./utils/CMS');

(async () => {
  console.log(`
\x1b[36m ==============================\x1b[0m
Welcome to Your Employee Tracker
\x1b[36m ==============================\x1b[0m
`);

  const db = new CMS();

  db.init();

  // await inquirer
  //   .prompt([
  //     {
  //       type: 'input',
  //       name: 'name',
  //       message: 'What is your name?',
  //     },
  //   ])
  //   .then((answers) => {
  //     console.log(answers);
  //   });
})();
