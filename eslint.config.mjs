import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Build outputs
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "next-env.d.ts",
    // Dependencies
    "node_modules/**",
    // Cache
    ".cache/**",
    ".turbo/**",
    // Public assets
    "public/**",
    // Config files
    "*.config.js",
    "*.config.ts",
    "*.config.mjs",
    "postcss.config.js",
  ]),
]);

export default eslintConfig;
