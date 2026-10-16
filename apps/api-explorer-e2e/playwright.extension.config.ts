import { defineConfig } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';

// Needs dist/apps/api-explorer and dist/tools/openapi-resource-devtools (built by the e2e-extension target).
// Serves the app itself, so there is no webServer; extensions only load in Chromium.
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src/extension' }),
  workers: 1,
  use: { trace: 'on-first-retry' },
});
