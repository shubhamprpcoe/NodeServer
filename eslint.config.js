// eslint.config.js
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const globals = require("globals");

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  {
    files: ["**/*.ts"],
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "logs/**",
      "coverage/**",
      "prisma.config.ts", // Exclude Prisma config file
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // Disable base ESLint rules that conflict with TypeScript
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-redeclare": "off",
      "no-use-before-define": "off",

      // Console and debugging
      "no-console": "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",

      // TypeScript-specific rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],

      // Type safety - Make nullish coalescing a warning instead of error
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "warn", // Changed from error to warn
      "@typescript-eslint/prefer-optional-chain": "warn", // Changed from error to warn

      // Code style and best practices
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/prefer-as-const": "error",

      // General code quality
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "warn",
      "prefer-template": "warn",
    },
  },
  {
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-console": "off",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
];
