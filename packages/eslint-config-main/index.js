module.exports = {
  plugins: ["simple-import-sort"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
  },
  ignorePatterns: ["node_modules/**/*", "dist/**/*", "coverage/**/*"],
  env: {
    browser: true,
    node: true,
  },
};
