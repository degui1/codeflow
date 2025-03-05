import globals from 'globals'
import pluginJs from '@eslint/js'
import { config, configs } from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import importPlugin from 'eslint-plugin-import'
import pluginPromise from 'eslint-plugin-promise'
import pluginQuery from '@tanstack/eslint-plugin-query'

/** @type {import('eslint').Linter.Config[]} */
export default config([
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
  },
  {
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      quotes: ['error', 'single'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-irregular-whitespace': 'error',
      'no-multi-spaces': 'error',
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.ts'],
        },
        typescript: {
          project: './tsconfig.app.json',
        },
      },
      react: { version: 'detect' },
    },
  },
  eslintPluginPrettierRecommended,
  pluginPromise.configs['flat/recommended'],
  ...pluginQuery.configs['flat/recommended'],
])
