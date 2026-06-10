# Privacy Policy — OpenAPI Resource Mocks DevTools

_Last updated: 2026-06-11_

## Overview

OpenAPI Resource Mocks DevTools is a Chrome DevTools extension for developers. It does not collect, transmit, or share any personal data.

## Data collected and stored

The extension stores **OpenAPI spec files** that you explicitly import via the Specs tab. These files are saved using `chrome.storage.local`, which keeps them on your device only. They are never uploaded to any server.

No other data is collected or stored.

## Data accessed but not stored

To display mock token state in the DevTools panel, the extension reads `window.__openApiMocks__` from the page you are inspecting. This data stays in memory for the duration of the DevTools session and is never written to disk or transmitted anywhere.

## Data sharing

No data is shared with third parties. The extension makes no network requests of its own.

## Permissions used

| Permission | Purpose |
|---|---|
| `tabs` | Identify which browser tab the DevTools panel is inspecting |
| `scripting` | Read `window.__openApiMocks__` from the inspected page's JavaScript context |
| `storage` | Persist imported OpenAPI spec files across DevTools sessions (device-local only) |
| `host_permissions: <all_urls>` | Allow the content script to run on any URL so it can detect Angular apps on localhost or any custom developer domain |

## Contact

Questions? Open an issue at <https://github.com/constantant/angular-openapi-gen/issues>.
