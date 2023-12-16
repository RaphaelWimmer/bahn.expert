module.exports = {
  root: true,
  extends: ['marudor', 'marudor/typescript'],
  env: { browser: true, node: true, es6: true },
  globals: { SERVER: false, M: false, MF: false },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['<root>/tsconfig.json'],
      },
    },
    react: { version: 'detect' },
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    warnOnUnsupportedTypeScriptVersion: true,
  },
  rules: {
    'react/no-unknown-property': [2, { ignore: ['css'] }],
    'prettier/prettier': 0,
    'react/react-in-jsx-scope': 0,
    'require-await': 0,
    'testing-library/no-debug': 0,
    // 'react-hooks/exhaustive-deps': 0,
    'testing-library/no-debugging-utils': 0,
    'no-console': 2,
    'unicorn/filename-case': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-redundant-type-constituents': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/ban-tslint-comment': 0,
    'import/no-unresolved': 0,
    '@typescript-eslint/ban-ts-comment': 0,
  },
};
