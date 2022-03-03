/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    "root": true,
    "extends": [
        "plugin:vue/vue3-essential",
        "eslint:recommended",
        "@vue/eslint-config-prettier"
    ],
    "rules": {
        "vue/padding-line-between-blocks": "error",
        "vue/new-line-between-multi-line-property": "error",
    },
    "env": {
        "vue/setup-compiler-macros": true
    }
}
