import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    rules: {
      "max-lines": ["error", { max: 200, skipBlankLines: false, skipComments: false }],
    },
  },
  {
    ignores: ["dist/", "node_modules/", "tests/"],
  },
);
