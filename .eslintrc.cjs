/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    "root": true,
    "extends": [
        "plugin:vue/essential",
        "plugin:prettier/recommended",
        "eslint:recommended"
    ],
    "rules": {
        "vue/padding-line-between-blocks": "error",
        "vue/new-line-between-multi-line-property": "error",
        "vue/no-dupe-keys": "off"
    },
    "env": {
        "vue/setup-compiler-macros": true
    },
}
