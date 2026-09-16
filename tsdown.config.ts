import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/index.ts",
  attw: {
    profile: "esm-only",
  },
  publint: true,
  sourcemap: true,
});
