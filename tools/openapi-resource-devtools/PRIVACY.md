# Privacy Policy — OpenAPI Resource Mocks DevTools

_Last updated: 2026-10-13_

## Overview

OpenAPI Resource Mocks DevTools is a Chrome DevTools extension for developers. It does not collect, transmit, or share any personal data.

## Data collected and stored

The extension stores the following with `chrome.storage.local`, which keeps it on your device only. None of it is ever uploaded to any server.

- **OpenAPI spec files** that you explicitly import via the Specs tab.
- **Mocks you create in the panel**: the endpoint, its base URL, its catch mode and the response you last set for it.
- **Scenarios** you save (named snapshots of mock responses).

The list of sites on which you switched interception on is kept by Chrome as registered content scripts of the extension.

No other data is collected or stored.

## Data accessed but not stored

To display mock state in the DevTools panel, the extension reads `window.__openApiMocks__` from the page you are inspecting, including the requests the page made to mocked endpoints. This data stays in memory for the duration of the DevTools session and is never written to disk or transmitted anywhere.

On sites where interception is switched on, the panel also reads which URLs the page requested through `fetch` / `XMLHttpRequest` (the HTTP method and the URL without its query string — no headers, no bodies), in order to suggest the base URL of an imported spec. The list lives in the page's memory and is never written to disk or transmitted anywhere.

On those sites the panel also receives the JSON response bodies of requests that belong to an operation of a spec you imported, so that it can offer the real response as the starting point for a mock. They are shown in the panel, kept in memory for the DevTools session, and never written to disk or transmitted anywhere. A response becomes part of stored data only if you yourself save it as a mock response or in a scenario.

## Request interception

On sites where you click **Intercept** in the panel — and only there — the extension injects a script that patches `fetch` and `XMLHttpRequest` in the page. Requests to the endpoints you mocked are answered locally in the page; all other requests are passed to the network unchanged. The extension does not record, forward or modify them.

## Data sharing

No data is shared with third parties. The extension makes no network requests of its own.

## Permissions used

| Permission | Purpose |
|---|---|
| `tabs` | Identify which browser tab the DevTools panel is inspecting |
| `scripting` | Read `window.__openApiMocks__` from the inspected page's JavaScript context, and inject the mock runtime on sites where you switched interception on |
| `storage` | Persist imported OpenAPI spec files, panel-created mocks and scenarios across DevTools sessions (device-local only) |
| `host_permissions: <all_urls>` | Allow the content script to run on any URL so it can detect Angular apps on localhost or any custom developer domain |

## Contact

Questions? Open an issue at <https://github.com/constantant/angular-openapi-gen/issues>.
