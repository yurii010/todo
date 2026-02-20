import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
            'prettier'
        ],
        plugins: {
            prettier
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        rules: {
            semi: ['error', 'always'],
            '@typescript-eslint/semi': ['error', 'always'],

            quotes: [
                'error',
                'single',
                {
                    avoidEscape: true,
                    allowTemplateLiterals: true
                }
            ],

            indent: 'off',
            '@typescript-eslint/indent': ['error', 4],

            'prettier/prettier': [
                'error',
                {
                    semi: true,
                    singleQuote: true,
                    tabWidth: 4,
                    useTabs: false,
                    trailingComma: 'none',
                    printWidth: 100
                }
            ],

            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_'
                }
            ]
        }
    }
]);
