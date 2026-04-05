import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ["src/**/*.ts"],
    rules: {
      "max-lines": ["error", { max: 350, skipBlankLines: false, skipComments: false }],
    },
  },
  {
    ignores: ["dist/", "node_modules/", "tests/"],
  },
);
