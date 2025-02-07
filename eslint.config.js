import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import ts from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: {
        version: '18.3',
        runtime: 'automatic',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      'react-refresh': reactRefresh,
      '@typescript-eslint': ts,
      prettier: prettier,
      'unused-imports': unusedImports,
    },
    rules: {
      ...js.configs.recommended.rules, // JavaScript 기본 규칙
      ...react.configs.recommended.rules, // React 기본 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 기본 규칙
      ...jsxA11y.configs.recommended.rules, // 접근성 기본 규칙
      ...ts.configs.recommended.rules, // TypeScript 기본 규칙
      'prettier/prettier': 'error', // Prettier 스타일 규칙
      'react/react-in-jsx-scope': 'off', // React 를 import 하지 않아도 됨
      'jsx-a11y/no-static-element-interactions': 'off', // <button> 태그가 아니어도 onClick 속성 추가가 가능하도록
      'jsx-a11y/click-events-have-key-events': 'off',
      'unused-imports/no-unused-imports': 'error', // 사용하지않는 import 문은 error가 나도록
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ], // 사용하지 않는 매개변수는 앞에 '_' 붙일 시 경고 안남
    },
  },
);
