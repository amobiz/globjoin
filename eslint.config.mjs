// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  // GLOBAL ignore object
  {
    ignores: [
      "dist/",
      "build/",
      "coverage/",
      "**/*.generated.js"
    ]
  },
  {
    files: ['src/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
}]);
