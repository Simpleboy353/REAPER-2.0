module.exports = {
  env: {
    es2020: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    'no-unused-vars': 'off'
  }
}
