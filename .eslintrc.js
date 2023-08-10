module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    semi: 'error',
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.ts', '.tsx'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
        endOfLine: 'auto',
        semi: true,
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],
    'import/extensions': ['off', 'never'],
    'react/prop-types': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['off'],
    'react/react-in-jsx-scope': 'off',
    'no-empty-pattern': 'warn',
    'import/prefer-default-export': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-no-bind': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'off',
    'react/function-component-definition': 'off',
    'react/destructuring-assignment': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  ignorePatterns: ['**/*.js'],
};
