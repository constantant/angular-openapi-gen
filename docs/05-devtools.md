# 5 — Chrome DevTools Extension

The **OpenAPI Resource Mocks DevTools** panel gives you a live, clickable UI over every mocked
endpoint of the inspected page. It works in two ways:

- **The app registers the endpoints** (`provideXxxMock()` in a mock build) and the panel controls
  them.
- **The panel registers the endpoints** on a page that bundles no mock code at all — including a
  production build. See [Mocking a production build](#mocking-a-production-build).

---

## Install the extension

> The extension is pending Chrome Web Store review. Use **Load unpacked** for now.

1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/constantant/angular-openapi-gen.git
   cd angular-openapi-gen
   npm ci
   ```
2. Build the extension:
   ```bash
   npx nx run openapi-resource-devtools:build
   ```
3. Open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and
   select `dist/tools/openapi-resource-devtools/`.

---

## Connecting to an app that registers its own mocks

Nothing to set up beyond the mock config from [Guide 4](./04-e2e-tests.md):

```typescript
// app.config.mock.ts
const mockConfig: ApplicationConfig = {
  providers: [
    provideFindPetsByStatusMock({ value: [] }),
    // ...
  ],
};
export const mockAppConfig = mergeApplicationConfig(baseConfig, mockConfig);
```

Open Chrome DevTools (`F12`) on a page running this config. The **API Mocks** tab
appears in the DevTools tab bar and lists the registered endpoints.

---

## Mocking a production build

The extension can install the mock runtime itself, so the app needs no mock code. Requests are
still answered inside the page — nothing goes through a proxy or a service worker.

1. **Import the spec** in the **Specs** tab (the full OpenAPI file, so the panel knows the paths).
2. **Click `◉ Intercept`** in the toolbar. This switches interception on for the inspected site
   and patches the open page right away.
3. **Check the base URL** shown next to the spec (expand it in the Specs tab). It is taken from
   the spec's `servers[0].url`, which is often not what your app calls. Use the app for a moment:
   the URLs it really requests are offered under the field as **Seen on this page** — click one
   to use it. You can also type it (a relative one such as `/api` is fine). Requests are matched
   as method + base URL + path.
4. **Use the app.** Every operation of the spec that the page requests is listed in the mock
   table by itself, the first time it is requested. A listed endpoint has no response yet, so its
   requests still reach the real API. (**＋ New mock** adds one that has not been requested yet.)
5. Select an endpoint. The **Respond** editor already holds what the real API last answered for
   it, so you start from real data: edit it and click **Resolve** — or switch on catch mode
   (**⏸**) to hold the next request and release it with the edited response.

From then on:

- Requests of that endpoint are answered with your response; all other requests go to the real API.
- On a reload the very first request is already mocked: the runtime is injected before the app's
  scripts run and holds requests (for at most 1.5 s) until the endpoints have arrived.
- The endpoints and the response you last set are stored in the extension, so they keep working
  after a reload, in a new session, and **with DevTools closed**. **Reset** drops the stored
  response; deleting the mock removes the endpoint.

Things to know:

- **Interception is per site and opt-in.** `fetch` / `XMLHttpRequest` are only patched on sites
  where you clicked `◉ Intercept`. Chrome match patterns have no port, so `localhost:4200` and
  `localhost:4201` count as one site.
- **Switching it off** takes effect on the next page load; the open page keeps the patch until then.
- **Base URL suggestions** come from the requests the page makes through `fetch` /
  `XMLHttpRequest` while it is intercepted. A request whose path ends with one of the spec's paths
  (same method) suggests whatever precedes it; the number on a suggestion is how many operations of
  the spec were seen under it. Requests made before you clicked `◉ Intercept` are not known —
  reload the page or trigger them again. Only the method and the URL without its query are read,
  and nothing is stored.
- **An endpoint without a base URL** stays `local` and answers nothing; the Create dialog warns you.
- **Real responses as the starting point.** While an endpoint is not mocked, the JSON its real
  API returns is kept as the endpoint's value (status `resolved`, a `real` entry in History) and
  pre-fills the Respond editor. It never changes what the app receives. Bodies over 512 KB and
  non-JSON responses are skipped. A caught request does not reach the real API, so what you see
  then is the response to an earlier request; **Reset** releases a caught request to the real API.
- **Automatic listing** needs the spec's base URL to be right: a request is matched as method +
  base URL + path. Endpoints listed this way are panel-managed mocks like the ones you create.
  Remove one with 🗑 and it is not listed again until you reopen DevTools.
- **Live updates.** An edit answers requests that are being held. To also refresh data that is
  already on screen, the app's libs must be generated with `--mockHooks` (included in
  `--includeMocks`); otherwise, and for `HttpClient` endpoints, the edit applies to the next request.
- **Validation still runs.** A lib generated with `--validateResponses` rejects a mocked response
  that does not match the schema — use **⚡ Example** or **✓ Validate**.

---

## Panel overview

The panel has two panes:

- **Left — mock table**: every mocked endpoint with its current status and action buttons
- **Right — detail tabs** (`Respond`, `History`, `Specs`): appear when you click a row

### Status values

| Status | Meaning |
|--------|---------|
| `idle` | No request has been answered yet (or `reset()` was called) |
| `loading` | Request in flight |
| `resolved` | Data available |
| `error` | Last request failed |
| `local` | Panel-managed entry that is not active in the page (see [Panel-managed mocks](#panel-managed-mocks)) |
| **CAUGHT** | Catch mode is active; request is held until you release it |

---

## Catching requests

**Catch mode** holds a request of the endpoint open until you explicitly decide the response. Use it to:
- Inspect what params the component sent before deciding the response
- Test loading skeletons without hardcoded delays
- Reproduce race conditions and error states on demand

### Enable per mock

Click the **⏸** button in the row's Actions column. The row gains an amber left border.

### Enable for all mocks

Click **⏸ Catch All** in the toolbar.

### Release a caught request

When a mock is caught, the **Respond** tab shows:
- **Caught request args** — the path params, body and query the app sent
- **Response (JSON)** — fill this in and click **Release → Resolve** or **Release → Fail**

After release, if catch mode is still on, the next request from that mock is immediately
caught again.

---

## Respond tab

Controls the selected mock's response:

| Control | What it does |
|---------|-------------|
| **Response (JSON)** | The response body; leave empty for an empty `204` response |
| **⚡ Example** | Generates a valid random payload from the response schema (requires Specs import) |
| **✓ Validate** | Validates the current JSON against the response schema |
| **Delay (ms)** | Adds simulated latency before resolving |
| **Resolve** | Responds with the given value from now on; held requests are answered, live resources reload |
| **Loading** | Holds requests open |
| **Fail** | Responds with HTTP 500 and the given value as the body |
| **Reset** | Drops the edit: back to the app's own behavior, or to the real API when there is none |

---

## History tab

Reverse-chronological event log for the selected mock. Each row shows the event type, timestamp, and a one-line preview.

### Request inspector

For `request` and `caught` events, clicking a row expands a structured detail view:

- **Filled URL** — e.g. `GET /pet/42` (path params substituted with actual values)
- **Path param rows** — one row per `{placeholder}`, labeled by name from the spec
- **Query / Body section** — the remaining args, labeled **Body** and **Query**
- **Binary badges** — `[FormData]`, `[Blob]`, `[ArrayBuffer]`, `[File: name]` are shown as inline badges rather than quoted strings

For `resolve` and `error` events the detail view shows the response value or error object.

The row preview for `request`/`caught` events shows the filled URL — e.g. `GET /pet/42` — at a glance without expanding.

> **Note:** Path param labels and filled URLs require the spec to be imported in the Specs tab.

---

## Specs tab

The **Specs** tab (top-right area) lets you import OpenAPI spec metadata so the panel can
display response schemas and enable schema-aware Respond tab features.

### Importing a spec

Two formats are accepted:

**`mocks.manifest.json`** (generated by `--includeMocks`) — a lightweight metadata file
with path, method, operationId, and tag per endpoint. Enables the History inspector's path
labels but not schema features.

**Full OpenAPI spec** (`.json` or `.yaml`, local file or HTTPS URL) — includes response
schemas. Enables ⚡ Example and ✓ Validate in the Respond tab.

Each spec has a **Base URL** field (pre-filled from `servers[0].url` of a full spec, empty for a
manifest). Panel-managed mocks need it to match requests; mocks registered by the app do not.
While the site is intercepted, the URLs under which the page requested this spec's operations are
suggested below the field — this works for a manifest too.

After import, the panel shows a confirmation form where you can verify the **specId** —
it must match the `--specId` value used when generating the mock library (defaults to the
base URL token name with `_BASE_URL` stripped, e.g. `PETSTORE_BASE_URL` → `petstore`).

Specs are stored in `chrome.storage.local` and persist across DevTools sessions.

### Workflow

1. Generate the lib with `--includeMocks --specId=petstore`
2. In the Specs tab, click **+ File** and select `libs/petstore-data-access/src/mocks.manifest.json`
   — this gives you path labels in History
3. Optionally, import the full spec file (`specs/petstore.yaml`) for schema features

---

## Scenarios

The **Scenarios** toolbar button opens a dialog to save, load, and export snapshots of the
entire mock table state (values + catch modes).

### Saving a scenario

1. Set up mock values and catch modes in the main panel.
2. Click **Scenarios** → enter a name → **Save**.
3. The scenario is stored in `chrome.storage.local` and persists across DevTools sessions.

### Loading a scenario

Click a saved scenario → **Load**. The panel sends control messages to the page to apply
all the saved values and catch modes in one step.

Keys that no longer exist in the current page are silently skipped — scenarios are
forward-compatible with component changes.

### Exporting / importing

- **Export** — copies the current mock table state as JSON to the clipboard (or downloads
  as a file if clipboard access is denied). Share the JSON with a teammate.
- **Import** — open the dialog, click **Import from file**, select a previously exported
  JSON — the state is applied immediately without saving as a named scenario.

This makes it easy to reproduce a specific UI state across machines or share a bug
reproduction setup via a JSON file committed alongside a PR.

---

## Panel-managed mocks

**＋ New mock** creates an endpoint that the panel owns, rather than the app.

1. Import the spec in the **Specs** tab first.
2. Click **＋ New mock** in the mock table toolbar.
3. In the dialog:
   - Pick a spec from the dropdown
   - Select an operation from the list
   - The key is auto-generated (e.g. `findPetsByStatus` → `FIND_PETS_BY_STATUS`); edit if needed
4. Click **Create**.

What happens next depends on the page:

- **Interception is on and the spec has a base URL** — the endpoint is registered in the page and
  starts answering requests ([Mocking a production build](#mocking-a-production-build)).
- **Otherwise** — the entry stays `local`. You can already set catch mode and a response; they
  apply as soon as the endpoint becomes active.
- **The app registers the same key itself** (`provideFindPetsByStatusMock()`) — the entry is
  promoted in place and the app's own rule is used. Catch mode is preserved.

Panel-managed mocks are stored in `chrome.storage.local` with their catch mode and last response,
and are restored whenever the panel or the page loads. Only panel-managed mocks can be deleted
from the table; mocks the app registered cannot.

---

## Toolbar actions reference

| Button | Action |
|--------|--------|
| **↺ Refresh** | Re-queries all mock states from the page |
| **◉ Intercept** | Switches request interception on or off for the inspected site |
| **⏸ Catch All** | Toggles catch mode on every registered mock |
| **Clear** | Empties the table of mocks the app registered (does not affect the page; they are listed again on the next refresh). Mocks created in the panel are kept |
| **Reset All** | Calls `reset()` on every mock |
| **Scenarios** | Opens the Scenarios dialog |
| **＋ New mock** | Opens the Create mock dialog |
| **Filter…** | Filters the mock table by key name |

---

## Catch-mode pre-injection

When you enable catch mode and then navigate to a new page (or reload), the background
service worker injects `window.__oarmPendingCatch__` into the page **before Angular's
module scripts execute**. The mock runtime reads this when it starts and pre-populates its
catch-mode set, so the very first request of the page is caught — no async round-trip required.

This means catch mode works reliably even for data loaded at startup, not just for
user-triggered interactions.

---

## Tips

**Combine with E2E tests** — the same mock runtime your Playwright tests use is what the
DevTools panel connects to. Run `nx serve myapp --configuration=mock-e2e` (port 4201),
open DevTools, and you can manually interact with the same app state your tests control
programmatically.

**Commit the manifest** — check `mocks.manifest.json` into git alongside the generated
lib. Teammates can import it from the local file picker without needing to build anything.

**Use Scenarios for PR reviews** — export the mock state that reproduces the feature you're
reviewing, commit the JSON to the PR branch, and include the import instructions in the PR
description.
