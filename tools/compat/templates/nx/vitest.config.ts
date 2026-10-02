import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.spec.ts', 'e2e.spec.ts'],
    // Integration specs compile the output against the repo's Angular and TypeScript; this harness
    // installs neither, and it is about Nx compatibility.
    exclude: ['**/*.integration.spec.ts', '**/node_modules/**'],
    root: '.',
    testTimeout: 60000,
  },
});
