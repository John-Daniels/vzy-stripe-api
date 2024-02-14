module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "prettier",
  ],
  parseOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {},
};
