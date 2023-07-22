module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}]
  ],
  // transform jsx syntax
  plugins: ["@babel/plugin-transform-react-jsx"]
};

  