module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 5
    },
    'rules': {
        'no-console': 'off',
        'no-extra-semi': 'off',
        'no-undef': 'off',
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'no-unused-vars': 0,
        'no-shadow-restricted-names': 0,
    }
};