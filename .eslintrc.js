module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    "project": "./tsconfig.json",
  }, // to enable features such as async/await
  settings: { react: { version: 'detect' } },
  // We don't want to lint generated files nor node_modules, but we want to lint
  // .prettierrc.js (ignored by default by eslint)
  ignorePatterns: [
    'node_modules/*',
    '.next/*',
    '.out/*',
    'build/*',
    'scratch',
    '_resources',
    '!.prettierrc.js',
    '!.eslintrc.js',
    '!gql-ts/get-wp-gql-schema.mjs',
  ],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    "eslint:recommended",
    "plugin:react/recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // not like the olden days
  ],
  overrides: [
    // This configuration will apply only to TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser', // Specifies the ESLint parser
      env: {
        browser: true,
        node: true,
        es6: true,
      },
    },
  ],
  rules: {
    'array-bracket-newline': [
      'error',
      {
        multiline: true,
      },
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'comma-spacing': 'error',
    'comma-style': ['error', 'last'],
    'dot-location': ['error', 'property'],
    'import/extensions': 0,
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 0,
    'jsx-quotes': ['error', 'prefer-double'],
    'new-cap': ['error', { newIsCapExceptions: ['jsPDF'] }],
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'no-underscore-dangle': 0,
    'no-whitespace-before-property': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],
    'one-var-declaration-per-line': ['error', 'initializations'],
    'operator-linebreak': ['error', 'after'],
    'padded-blocks': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'multiline-block-like',
        next: ['multiline-block-like'],
      },
      {
        blankLine: 'never',
        prev: 'var',
        next: 'var',
      },
      {
        blankLine: 'always',
        prev: 'var',
        next: 'block-like',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'function',
      },
      {
        blankLine: 'always',
        prev: 'function',
        next: '*',
      },
      {
        blankLine: 'never',
        prev: '*',
        next: 'empty',
      },
      {
        blankLine: 'always',
        prev: 'directive',
        next: '*',
      },
    ],
    // CRED: https://bit.ly/2HtgMDY ...if it doesn't work, try:
    // https://bit.ly/2HtdGzT
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        // packageDir: './',
      },
    ],
    'quote-props': ['error', 'as-needed'],
    'space-before-blocks': 'error',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-unary-ops': 'error',
    /* Begin platform-specific */
    // Includes .prettierrc.js rules
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    // We will use TypeScript's types for component props instead
    'react/prop-types': 'off',
    // No need to import React when using Next.js
    'react/react-in-jsx-scope': 'off',
    "react/jsx-props-no-spreading": 0, // IT'S FINE
    "react/no-danger": 0, // dangerouslySetInnerHTML
    "react/no-unescaped-entities": [
      "error",
      {
        "forbid": [">", "}"]
      }
    ],
    "react/jsx-wrap-multilines": [
      0,
      {
        "prop": "parens-new-line"
      }
    ],
    // This rule is not compatible with Next.js's <Link /> components
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
  },
}
