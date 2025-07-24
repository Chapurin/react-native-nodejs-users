"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_1 = __importDefault(require("@eslint/js"));
const eslint_plugin_1 = __importDefault(require("@typescript-eslint/eslint-plugin"));
const parser_1 = __importDefault(require("@typescript-eslint/parser"));
const eslint_plugin_prettier_1 = __importDefault(require("eslint-plugin-prettier"));
exports.default = [
    js_1.default.configs.recommended,
    {
        files: ['**/*.ts'],
        ignores: ['**/*.config.ts', 'dist', 'node_modules'],
        languageOptions: {
            parser: parser_1.default,
            globals: {
                process: 'readonly',
                console: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': eslint_plugin_1.default,
            prettier: eslint_plugin_prettier_1.default,
        },
        rules: {
            // Enforce consistent indentation (4 spaces in this case)
            indent: ['error', 4],
            // Enforce the use of single quotes for strings
            quotes: ['error', 'single'],
            // Enforce semicolons at the end of statements
            semi: ['error', 'always'],
            // Enforce consistent line breaks (LF for Unix)
            'linebreak-style': ['error', 'unix'],
            // Require the use of === and !== (no implicit type conversions)
            eqeqeq: ['error', 'always'],
            // Enforce a maximum line length (usually 80 or 100 characters)
            'max-len': ['error', { code: 100 }],
            // Enable Prettier as a lint rule
            'prettier/prettier': [
                'error',
                {
                    singleQuote: true,
                    semi: true,
                },
            ],
        },
    },
];
