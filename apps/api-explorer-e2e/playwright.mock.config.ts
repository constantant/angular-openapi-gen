import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';

export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src/mock' }),
  use: {
    baseURL: 'http://localhost:4201',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npx nx run api-explorer:serve --configuration=mock-e2e',
    url: 'http://localhost:4201',
    reuseExistingServer: true,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
