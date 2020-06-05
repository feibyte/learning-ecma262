module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'airbnb-typescript/base'
  ],
  rules: {
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-unused-vars": "off"
  }
};
