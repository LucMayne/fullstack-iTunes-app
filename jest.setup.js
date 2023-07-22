// jest.setup.js
const path = require('path');

// Define an array of test files that require a Node.js environment
const nodeTestFiles = [
  path.join(__dirname, './test', './app.test.js'),
];

// Check if the current test file requires a Node.js environment
if (nodeTestFiles.includes(process.env.JEST_CURRENT_TEST_FILE)) {
  // Set the testEnvironment option to 'node'
  process.env.JEST_TEST_ENVIRONMENT = 'node';
}
