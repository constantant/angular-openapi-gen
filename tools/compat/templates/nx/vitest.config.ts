import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { globals: true, environment: 'node', include: ['src/**/*.spec.ts', 'e2e.spec.ts'], root: '.', testTimeout: 60000 },
});
