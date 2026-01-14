import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
    {
        ignores: ['dist/**', 'public/**']
    },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                ...globals.browser
            }
        },
        plugins: {
            import: importPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: prettierPlugin
        },

        settings: {
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json'
                },
                node: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']
                }
            }
        },

        rules: {
            ...reactHooks.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,
            ...importPlugin.configs.typescript.rules,
            ...prettierPlugin.configs.recommended.rules,

            'react-refresh/only-export-components': [
                'warn',
                {allowConstantExport: true}
            ],

            'import/order': [
                'error',
                {
                    groups: [
                        ['external', 'builtin'],
                        'internal',
                        ['parent', 'sibling', 'index']
                    ],
                    alphabetize: {order: 'asc', caseInsensitive: true},
                    'newlines-between': 'always'
                }
            ],

            'import/extensions': [
                'error',
                'never',
                {ts: 'never', tsx: 'never'}
            ],

            'import/no-unresolved': ['error', {ignore: ['^swiper/']}],

            'react-hooks/refs': 'off'
        }
    },

    prettierConfig
];
