import { chromium, expect, test, type BrowserContext, type Page, type Worker } from '@playwright/test';
import { workspaceRoot } from '@nx/devkit';
import { createServer, type Server } from 'node:http';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { extname, join, normalize } from 'node:path';

// Drives the unpacked extension against the production build of api-explorer: the app is served
// statically, the extension intercepts the Petstore request and answers it from a panel-managed mock.
const EXTENSION = join(workspaceRoot, 'dist/tools/openapi-resource-devtools');
const APP = join(workspaceRoot, 'dist/apps/api-explorer/browser');
const PETSTORE = 'https://petstore.swagger.io/v2';

const MIME: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

const MOCKED_PET = { id: 1, name: 'ExtensionPet', photoUrls: [], status: 'available' };

let server: Server;
let origin: string;
let profile: string;
let context: BrowserContext;
let worker: Worker;

test.beforeAll(async () => {
  test.skip(!existsSync(join(EXTENSION, 'manifest.json')), 'build openapi-resource-devtools first');
  test.skip(!existsSync(join(APP, 'index.html')), 'build api-explorer first');

  server = createServer((req, res) => {
    const rel = normalize(decodeURIComponent((req.url ?? '/').split('?')[0])).replace(/^[/\\]+/, '');
    let file = join(APP, rel);
    // Unknown paths are client-side routes
    if (!file.startsWith(APP) || !existsSync(file) || statSync(file).isDirectory()) file = join(APP, 'index.html');
    res.setHeader('content-type', MIME[extname(file)] ?? 'application/octet-stream');
    res.end(readFileSync(file));
  });
  await new Promise<void>((done) => server.listen(0, '127.0.0.1', done));
  origin = `http://127.0.0.1:${(server.address() as { port: number }).port}`;

  profile = mkdtempSync(join(tmpdir(), 'oarm-ext-'));
  context = await chromium.launchPersistentContext(profile, {
    channel: 'chromium', // the new headless mode, which supports extensions
    args: [`--disable-extensions-except=${EXTENSION}`, `--load-extension=${EXTENSION}`],
  });
  worker = context.serviceWorkers()[0] ?? (await context.waitForEvent('serviceworker'));
});

test.afterAll(async () => {
  await context?.close();
  await new Promise((done) => server?.close(done));
  if (profile) rmSync(profile, { recursive: true, force: true });
});

/** What the panel's "Intercept" button does: a `set-intercept` message on the tab's devtools port. */
async function setIntercept(page: Page, enabled: boolean): Promise<void> {
  const tabId = await worker.evaluate(async (url) => (await chrome.tabs.query({ url }))[0].id, `${origin}/*`);
  const panel = await context.newPage();
  await panel.goto(`chrome-extension://${new URL(worker.url()).host}/devtools.html`);
  const state = await panel.evaluate(
    ([id, on]) =>
      new Promise<boolean>((resolve) => {
        const port = chrome.runtime.connect({ name: `devtools-${id}` });
        port.onMessage.addListener((m) => m.type === 'intercept-state' && resolve(m.enabled));
        port.postMessage({ type: 'set-intercept', enabled: on });
      }),
    [tabId, enabled] as const,
  );
  expect(state).toBe(enabled);
  await panel.close();
  await page.bringToFront();
}

test('answers a production-build request from a panel-managed mock', async () => {
  await worker.evaluate(
    async ([pet, baseUrl]) =>
      chrome.storage.local.set({
        oarm_local_mocks: {
          FIND_PETS_BY_STATUS: {
            meta: { specId: 'petstore', operationId: 'findPetsByStatus', path: '/pet/findByStatus', method: 'get' },
            baseUrl,
            catchMode: false,
            override: { value: [pet] },
          },
        },
      }),
    [MOCKED_PET, PETSTORE] as const,
  );

  const page = await context.newPage();
  const leaked: string[] = [];
  await page.route(`${PETSTORE}/**`, (route) => {
    leaked.push(route.request().url());
    return route.abort();
  });
  await page.goto(`${origin}/`);
  await setIntercept(page, true);
  leaked.length = 0; // the dashboard asked the real API before interception was on

  // A fresh load: document-start scripts hold the app's first request until the config arrives.
  await page.goto(`${origin}/pets`);
  await expect(page.getByText('ExtensionPet')).toBeVisible();
  expect(leaked).toEqual([]);
  await page.close();
});

test('lets requests through once interception is switched off', async () => {
  const page = await context.newPage();
  const reached: string[] = [];
  await page.route(`${PETSTORE}/**`, (route) => {
    reached.push(route.request().url());
    return route.abort();
  });
  await page.goto(`${origin}/`);
  await setIntercept(page, false);

  await page.goto(`${origin}/pets`);
  await expect.poll(() => reached.length).toBeGreaterThan(0);
  await expect(page.getByText('ExtensionPet')).toBeHidden();
  await page.close();
});
