# Tutorials

Step-by-step guides for `@constantant/openapi-resource-gen` and friends.
Each guide builds on the previous one; if you're starting fresh, read them in order.

**Prerequisites:** Angular 22+, Nx 22+, an existing Angular application.

---

## Guides

| # | Guide | What you'll learn |
|---|-------|-------------------|
| 1 | [Setup — generate a data-access lib](./01-setup.md) | Install the generator, point it at a spec, understand what gets emitted |
| 2 | [Consuming tokens in components](./02-consuming.md) | Inject generated tokens, conditional requests, mutations, auth |
| 3 | [Unit tests with `/testing`](./03-unit-tests.md) | Drop-in Vitest/Jasmine mocks, `MockResourceHandle`, response sequences |
| 4 | [E2E tests with Playwright](./04-e2e-tests.md) | Full mock bus, `page.evaluate()` control, history assertions |
| 5 | [Chrome DevTools Extension](./05-devtools.md) | Catch mode, Respond tab, Scenarios, History inspector, local mocks |

---

## Quick-reference

```bash
# Install
npm install -D @constantant/openapi-resource-gen @constantant/openapi-resource-mocks

# Generate from a URL — no curl step needed
npx nx g @constantant/openapi-resource-gen:api-resource \
  --specPath=https://petstore3.swagger.io/api/v3/openapi.yaml \
  --outputDir=libs/petstore-data-access/src \
  --baseUrlToken=PETSTORE_BASE_URL \
  --includeMocks \
  --specId=petstore

# Unit test a component
import { mockResource } from '@constantant/openapi-resource-mocks/testing';
const petsMock = mockResource(FIND_PETS_BY_STATUS, { value: [] });
TestBed.configureTestingModule({ providers: [petsMock] });

# Control a mock from Playwright
await page.evaluate(() =>
  openApiMock('FIND_PETS_BY_STATUS').resolve([{ id: 1, name: 'Rex', status: 'available' }])
);
```
