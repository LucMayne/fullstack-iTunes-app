const config = {
  clearMocks: true,
  // link to the cssTransform.js file
  transform: {
    '\\.css$': '<rootDir>/cssTransform.js',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  
  testEnvironment: 'jsdom',
};

module.exports = config;

// I set this up using this website: https://jestjs.io/docs/next/getting-started
