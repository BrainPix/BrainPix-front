import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:prettier/recommended'
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'react/require-default-props': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'react/button-has-type': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'import/prefer-default-export': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'consistent-return': 'off',
      'react/no-array-index-key': 'off',
      'no-await-in-loop': 'off',
      'no-plusplus': 'off',
      'no-param-reassign': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-destructuring': 'off',
      '@typescript-eslint/no-shadow': 'off',
      'jsx-a11y/label-has-associated-control': 'off'
    }
  }
)
