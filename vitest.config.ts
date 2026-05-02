import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    globals: true,
    setupFiles: ["tests/setup/vitest.setup.ts"],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      tests: path.resolve(__dirname, "tests"),
    },
  },
});
