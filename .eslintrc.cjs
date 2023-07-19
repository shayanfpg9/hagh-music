/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    babelOptions: {
      parserOpts: {
        plugins: ["jsx"],
      },
    },
    requireConfigFile: false,
  },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  parser: "@babel/eslint-parser",
  rules: {
    "react/prop-types": [
      1,
      {
        ignore: ["className", "children", "params"],
      },
    ],

    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    "no-unused-vars": "warn",

    "react/jsx-uses-vars": "warn",
  },
};
