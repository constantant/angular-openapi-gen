# 3 — Unit tests with `/testing`

`@constantant/openapi-resource-mocks/testing` mocks an endpoint for Vitest and Jasmine component
tests. The component under test keeps its real token and the real `HttpClient` / `httpResource`;
only the transport (`fetch` / `XMLHttpRequest`) is replaced. The test therefore runs the same code
as production, including interceptors and `--validateResponses`.

---

## Install

```bash
npm install -D @constantant/openapi-resource-mocks
```

Generate the lib with `--includeMocks`: every endpoint gets a descriptor (`FIND_PETS_BY_STATUS_MOCK`)
in the lib's `/mock` subpath, which is what `mockEndpoint()` takes.

---

## Basic usage

```typescript
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { mockEndpoint, uninstallMockInterception } from '@constantant/openapi-resource-mocks/testing';
import { FIND_PETS_BY_STATUS_MOCK } from '@myapp/petstore-data-access/mock';
import { PetsPageComponent } from './pets-page.component';

describe('PetsPageComponent', () => {
  afterAll(() => uninstallMockInterception()); // restore the native fetch / XMLHttpRequest

  it('renders pets when data arrives', async () => {
    const petsMock = mockEndpoint(FIND_PETS_BY_STATUS_MOCK, {
      value: [{ id: 1, name: 'Rex', status: 'available', photoUrls: [] }],
    });

    TestBed.configureTestingModule({
      imports: [PetsPageComponent],
      providers: [provideHttpClient(), petsMock],
    });

    const fixture = TestBed.createComponent(PetsPageComponent);
    await fixture.whenStable(); // the response is asynchronous, as in production
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('.pet-row');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Rex');
  });
});
```

`mockEndpoint()` returns an `EnvironmentProviders` that is also a **`MockEndpointHandle<T>`**. Put it
in `providers`; it brings:

- the endpoint's real token (you don't add `provideFindPetsByStatus()` yourself),
- a default base URL (`http://mock.test`),
- the request filter.

You add `provideHttpClient()`.

---

## `mockEndpoint` second argument

The second argument is how the endpoint answers:

```typescript
// Respond with data
mockEndpoint(FIND_PETS_BY_STATUS_MOCK, { value: [] })

// Hold every request open — test your loading skeleton
mockEndpoint(FIND_PETS_BY_STATUS_MOCK, { loading: true })

// Fail — test your error state (an HttpErrorResponse, status 500 unless you set one)
mockEndpoint(FIND_PETS_BY_STATUS_MOCK, { error: { message: 'unavailable' }, status: 503 })

// Respond after 500 ms
mockEndpoint(FIND_PETS_BY_STATUS_MOCK, { value: [], delay: 500 })
```

Without a second argument every request is **held**, so a test never reaches the network by
accident.

`value` is the full response type. With `--validateResponses` the mocked response is validated like
a real one, so the fixture has to satisfy the schema.

---

## Driving state mid-test

The handle changes the answer after the component rendered. Held requests are answered; when
nothing is held, the component's live `httpResource`s are reloaded so they show the new answer.

```typescript
it('shows the loading skeleton while the request is in flight', async () => {
  const petsMock = mockEndpoint(FIND_PETS_BY_STATUS_MOCK); // held
  TestBed.configureTestingModule({ imports: [PetsPageComponent], providers: [provideHttpClient(), petsMock] });

  const fixture = TestBed.createComponent(PetsPageComponent);
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('mat-progress-bar')).toBeTruthy();

  petsMock.resolve([{ id: 1, name: 'Rex', status: 'available', photoUrls: [] }]);
  await fixture.whenStable();
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelectorAll('.pet-row').length).toBe(1);
});

it('shows the error message on failure', async () => {
  // ... same setup ...
  petsMock.fail({ message: 'Service Unavailable' }, 503);
  await fixture.whenStable();
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('.error-message')).toBeTruthy();
});
```

### `MockEndpointHandle<T>`

| Member | Effect |
|--------|--------|
| `resolve(value)` | Answer held requests and all later ones; live resources reload |
| `fail(error, status?)` | The same with a failing response (default 500) |
| `setLoading()` | Hold every request until `resolve` / `fail` |
| `setProgress(type, loaded, total?)` | Report transfer progress to the held requests |
| `reset()` | Back to the behavior given to `mockEndpoint()` |
| `calls` | What each request carried |
| `expectCalled()` / `expectCalledWith(...args)` | Assertion helpers |

The controls work once the component (or anything else) has been created from the `TestBed`.

### Which wait to use

- `await fixture.whenStable()` — the request gets answered.
- `await flushMocks()` (from `/testing`) — the request stays held and you only want progress
  events to arrive.

`HttpClient` (Observable) tokens are not re-run by `resolve()`: the new answer applies to their next
request.

---

## Response sequences

Pass `{ sequence: [...] }` to answer successive requests differently. Each request consumes the
next entry; the last one repeats:

```typescript
it('retries and eventually succeeds', async () => {
  const petsMock = mockEndpoint(FIND_PETS_BY_STATUS_MOCK, {
    sequence: [
      { error: { message: 'timeout' }, status: 504 }, // first request fails
      { error: { message: 'timeout' }, status: 504 }, // second one too
      { value: [{ id: 1, name: 'Rex', status: 'available', photoUrls: [] }] },
    ],
  });
  TestBed.configureTestingModule({ imports: [RetryComponent], providers: [provideHttpClient(), petsMock] });

  const fixture = TestBed.createComponent(RetryComponent);
  await fixture.whenStable();
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('.error')).toBeTruthy();

  fixture.nativeElement.querySelector('.retry-btn').click();
  await fixture.whenStable(); // still failing (second entry)

  fixture.nativeElement.querySelector('.retry-btn').click();
  await fixture.whenStable();
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelectorAll('.pet-row').length).toBe(1);
});
```

---

## Asserting request params

`calls` holds what each request carried **on the wire**, in this order: path parameters (strings),
then the body, then the query (an object of strings).

```typescript
it('sends the selected status filter', async () => {
  const fixture = TestBed.createComponent(PetsPageComponent);
  await fixture.whenStable();

  fixture.componentInstance.statusFilter.set('sold');
  await fixture.whenStable();

  expect(petsMock.calls.length).toBe(2);
  petsMock.expectCalledWith({ status: 'sold' });
});

// GET /pet/{petId}            → expectCalledWith('7')
// POST /pet/{petId}/uploadImage with a file → expectCalledWith('7', file)
```

Numbers in the path or query arrive as strings (`'7'`, `{ limit: '20' }`) — that is what was sent.

---

## Testing multiple endpoints

```typescript
const petsMock = mockEndpoint(FIND_PETS_BY_STATUS_MOCK, { value: [] });
const addPetMock = mockEndpoint(ADD_PET_MOCK); // held until the test answers it

TestBed.configureTestingModule({
  imports: [PetsPageComponent],
  providers: [provideHttpClient(), petsMock, addPetMock],
});
```

An endpoint the component calls but the test did not mock is a real request. Mock everything the
component touches.

---

## Upload progress

Upload progress exists on the XHR transport only (as in a browser), so use `withXhr()` on
Angular 22+:

```typescript
const upload = mockEndpoint(UPLOAD_FILE_MOCK, {
  loading: true,
  progress: [{ type: 'upload', loaded: 1_000_000, total: 4_000_000 }],
});
TestBed.configureTestingModule({
  imports: [PetsPageComponent],
  providers: [provideHttpClient(withXhr()), upload],
});
// ... trigger the upload ...
await flushMocks();
fixture.detectChanges();
expect(bar.getAttribute('aria-valuenow')).toBe('25');
```

---

## Tip: your own base URL

The handle provides `http://mock.test` as the base URL. To test with another one, list your
provider **after** the handle:

```typescript
providers: [
  provideHttpClient(),
  petsMock,
  { provide: PETSTORE_BASE_URL, useValue: 'https://api.example.com' },
],
```

---

## Next

[Guide 4 — E2E tests with Playwright →](./04-e2e-tests.md)
