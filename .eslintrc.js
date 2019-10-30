"use strict";

module.exports = {
    parserOptions: {
        ecmaVersion: 2015,
        sourceType: "module"
    },
    plugins: [
        "mocha"
    ],
    extends: [
        "is2ei",
        "plugin:mocha/recommended",
        "eslint:recommended"
    ],
    env: {
        node: true,
        mocha: true
    }
};
