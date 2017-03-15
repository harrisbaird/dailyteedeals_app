module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:flowtype/recommended'
  ],
  rules: {
    'react/prop-types': 0,
    'flowtype-errors/show-errors': 2,
    semi: ['error', 'never']
  },
  plugins: ['standard', 'promise', 'react', 'react-native', 'flowtype-errors'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    // Prevent "fetch is not defined" error
    browser: true
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true
    }
  }
}
