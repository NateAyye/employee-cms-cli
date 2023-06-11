const CMS = require('./utils/CMS');

(async () => {
  // Log welcome message to the console on app start
  console.log(`
\x1b[36m ==============================\x1b[0m
Welcome to Your Employee Tracker
\x1b[36m ==============================\x1b[0m
`);

  // Initialize the CMS
  const cms = new CMS();
  // Start the CMS app
  cms.init();
})();
