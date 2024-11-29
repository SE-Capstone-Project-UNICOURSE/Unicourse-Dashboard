/**
 *  @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ['perfectionist', 'unused-imports', '@typescript-eslint', 'prettier'],
  extends: ['airbnb', 'airbnb-typescript', 'airbnb/hooks', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  /**
   * 0 ~ 'off'
   * 1 ~ 'warn'
   * 2 ~ 'error'
   */
  rules: {
    // general
    'arrow-body-style': 1,
    'no-alert': 1,
    camelcase: 1,
    'no-console': 1,
    'no-else-return': 0,
    'no-unused-vars': 1,
    'no-nested-ternary': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-restricted-exports': 0,
    'no-promise-executor-return': 0,

    'import/order': 0,

    'import/prefer-default-export': 0,
    'prefer-destructuring': [1, { object: true, array: false }],

    // typescript
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/consistent-type-exports': 0,
    '@typescript-eslint/no-unused-vars': 1,

    // react
    'react/no-children-prop': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-array-index-key': 0,
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': 0,
    'react/jsx-no-duplicate-props': [1, { ignoreCase: false }],
    'react/jsx-no-useless-fragment': [1, { allowExpressions: true }],
    'react/no-unstable-nested-components': [1, { allowAsProps: true }],
    'react/jsx-curly-brace-presence': 0,
    'react/no-unused-prop-types': 0,
    'react-hooks/exhaustive-deps': 1,

    // jsx-a11y
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/control-has-associated-label': 0,

    // unused imports
    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': 1,
    'perfectionist/sort-exports': 0,
    'perfectionist/sort-named-imports': 0,
    'perfectionist/sort-named-exports': 0,
    'perfectionist/sort-imports': 0,

    'import/extensions': 0,
    'import/no-unresolved': 1,
    'import/no-extraneous-dependencies': 0,
    'import/no-cycle': 0,
    'import/no-named-as-default': 0,

    //
    'class-methods-use-this': 0,
  },
};
