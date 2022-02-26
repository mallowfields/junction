module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    node: true,
    es6: true
  },
  globals: {
    'BigInt': 'readonly'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': ['error', 'never'],
    'no-prototype-builtins': 'off',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'space-before-function-paren': ['error', {
      'named': 'never',
      'anonymous': 'always',
      'asyncArrow': 'always'
    }],
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'import/no-duplicates': 'off'
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ]
}
