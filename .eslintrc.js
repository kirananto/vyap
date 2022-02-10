module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'react-hooks'
    ],
    'parserOptions': {
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error', // TODO Will be moved to error soon
        'react/prop-types': 'off',
        'semi': [1, 'never'],
        eqeqeq: [1, 'always'],
        '@typescript-eslint/ban-ts-comment': 'off', // TODO Will be turned on later
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off', // TODO will be turned on later
        'react/no-unescaped-entities': 'warn', // TODO Will be turned on later
        'no-console': 0,
        'quotes': [1, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'curly': 0,
        'brace-style': ['error', '1tbs'],
        'indent': ['error', 4, { SwitchCase: 1 }],
        'eol-last': ['error', 'never'],
        '@typescript-eslint/no-unused-vars': 2
    },
    'settings': {
        'react': {
            'pragma': 'React',
            'version': 'detect'
        }
    }
}