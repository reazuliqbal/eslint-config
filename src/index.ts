// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';

const perfectionistConfig: any = {
  plugins: {
    perfectionist,
  },
  rules: {
    'perfectionist/sort-imports': [
      'error',
      {
        type: 'natural',
        order: 'asc',
        groups: [
          'type',
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
    'sort-keys': 'off',
    '@typescript-eslint/no-unnecessary-condition': [
      'error',
      {
        allowConstantLoopConditions: true,
      },
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false },
    ],
  },
};

export default [
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  stylistic.configs.customize({
    arrowParens: true,
    braceStyle: '1tbs',
    indent: 2,
    quotes: 'single',
    semi: true,
  }),
  perfectionistConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.ts', 'eslint.config.mjs', 'prettier.config.mjs'],
          defaultProject: 'tsconfig.json',
        },
      },
    },
  },
  {
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  eslintConfigPrettier,
];
