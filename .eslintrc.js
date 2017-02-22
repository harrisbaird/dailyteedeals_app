module.exports = {
  "parser": "babel-eslint",
  "extends":  [
    "standard",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
  ],
  "rules": {
    "flowtype-errors/show-errors": 2,
    "react/prop-types": 0
  },
  "plugins": [
    "standard",
    "promise",
    "react",
    "react-native",
    "flowtype-errors",
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    // Prevent "fetch is not defined" error
    "browser": true
  }
};
