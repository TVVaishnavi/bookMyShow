export default [
  {
    files: ["*.ts", "*.tsx"],
    languageOptions: {
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: ["@typescript-eslint", "prettier", "jest"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:jest/recommended",
      "prettier",
    ],
    env: {
      "jest/globals": true, // Enable Jest globals
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "error", // Enforce no explicit `any`
      "prettier/prettier": "error",
      "no-undef": "off", // Disable `no-undef` as TypeScript handles this
    },
    globals: {
      jest: "readonly",
      describe: "readonly",
      it: "readonly",
      expect: "readonly",
      beforeEach: "readonly",
      afterEach: "readonly",
      beforeAll: "readonly", // Add `beforeAll`
      afterAll: "readonly", // Add `afterAll`
      test: "readonly",
    },
  },
];