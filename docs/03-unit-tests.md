# 3 — Unit tests with `/testing`

`@constantant/openapi-resource-mocks/testing` is a lightweight helper designed for
Vitest and Jasmine component tests. It does not set up a mock bus, touch `window`, or
emit DOM events — it simply replaces a token's factory with a signal-based mock and gives
you assertion helpers on top.

---

## Install

```bash
npm install -D @constantant/openapi-resource-mocks
```

No extra providers or test setup required beyond `TestBed`.

---

## Basic usage

```typescript
import { TestBed } from '@angular/core/testing';
import { mockResource } from '@constantant/openapi-resource-mocks/testing';
import { PetsPageComponent } from './pets-page.component';
import { FIND_PETS_BY_STATUS } from '@myapp/petstore-data-access';

describe('PetsPageComponent', () => {
  let petsMock: ReturnType<typeof mockResource<FindPetsByStatusResponse>>;

  beforeEach(() => {
    petsMock = mockResource(FIND_PETS_BY_STATUS);

    TestBed.configureTestingModule({
      imports: [PetsPageComponent],
      providers: [petsMock],  // MockResourceHandle extends FactoryProvider — drop it in directly
    });
  });

  it('renders pets when data arrives', async () => {
    const fixture = TestBed.createComponent(PetsPageComponent);
    fixture.detectChanges(); // component mounts; factory is called

    // Resolve with data
    petsMock.ref.resolve([
      { id: 1, name: 'Rex', status: 'available', photoUrls: [] },
    ]);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('.pet-row');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Rex');
  });
});
```

`mockResource()` returns a **`MockResourceHandle<T>`** which is:
- A `FactoryProvider` (place it directly in `providers`)
- `.ref` — a `MockResourceRef<T>` to drive state changes mid-test
- `.calls` — all args the factory was invoked with
- `.expectCalled()` / `.expectCalledWith(...args)` — assertion helpers

---

## `mockResource` second argument

The second argument sets the **initial behavior** on every factory invocation (i.e. every
time the component mounts or a reactive param change triggers a re-call):

```typescript
// Resolve immediately with seed data
mockResource(FIND_PETS_BY_STATUS, { value: [] })

// Stay loading indefinitely — test your loading skeleton
mockResource(FIND_PETS_BY_STATUS, { loading: true })

// Fail immediately — test your error state
mockResource(FIND_PETS_BY_STATUS, { error: new Error('network error') })

// Loading for 500 ms then resolve
mockResource(FIND_PETS_BY_STATUS, { value: [], delay: 500 })

// Fail after a delay — simulate slow network with timeout
mockResource(FIND_PETS_BY_STATUS, { error: new Error('timeout'), delay: 2000 })
```

---

## Driving state mid-test with `.ref`

After the component renders, use `petsMock.ref` to simulate state transitions:

```typescript
it('shows loading skeleton while request is in flight', async () => {
  const fixture = TestBed.createComponent(PetsPageComponent);
  petsMock.ref.setLoading();
  fixture.detectChanges();

  expect(fixture.nativeElement.querySelector('mat-progress-bar')).toBeTruthy();
});

it('shows error message on failure', async () => {
  const fixture = TestBed.createComponent(PetsPageComponent);
  fixture.detectChanges();

  petsMock.ref.fail(new Error('503 Service Unavailable'));
  fixture.detectChanges();

  expect(fixture.nativeElement.querySelector('.error-message')).toBeTruthy();
});

it('resets to idle', async () => {
  const fixture = TestBed.createComponent(PetsPageComponent);
  fixture.detectChanges();

  petsMock.ref.resolve([{ id: 1, name: 'Rex', status: 'available', photoUrls: [] }]);
  petsMock.ref.reset();
  fixture.detectChanges();

  expect(fixture.nativeElement.querySelector('.pet-row')).toBeNull();
});
```

### Full `MockResourceRef<T>` API

| Method | Effect |
|--------|--------|
| `resolve(value)` | Set value → `'resolved'` |
| `resolveAfter(ms, value)` | Loading immediately, resolve after `ms` ms |
| `setLoading()` | → `'loading'` |
| `fail(error)` | Set error → `'error'` |
| `reset()` | Clear all → `'idle'` |
| `reload()` | Keep value → `'reloading'`, fires request event |
| `setProgress(type, loaded, total?)` | Set transfer progress |

---

## Response sequences

Pass `{ sequence: [...] }` to advance through multiple states across factory invocations.
Each time the component calls the factory function (on mount or reactive param change),
the next entry in the sequence is applied. When exhausted, the last entry repeats.

This is perfect for testing pagination, retries, and multi-step flows:

```typescript
it('retries and eventually succeeds', async () => {
  petsMock = mockResource(FIND_PETS_BY_STATUS, {
    sequence: [
      { error: new Error('timeout') },              // first call fails
      { error: new Error('timeout') },              // second call also fails
      { value: [{ id: 1, name: 'Rex', ... }] },    // third succeeds
    ],
  });

  TestBed.overrideProvider(FIND_PETS_BY_STATUS, petsMock);
  const fixture = TestBed.createComponent(RetryComponent);

  // Mount — first call, fails
  fixture.detectChanges();
  expect(fixture.nativeElement.querySelector('.error')).toBeTruthy();

  // Simulate retry button click
  fixture.nativeElement.querySelector('.retry-btn').click();
  fixture.detectChanges();
  // Still failing (second entry)

  fixture.nativeElement.querySelector('.retry-btn').click();
  fixture.detectChanges();
  // Third call — resolved
  expect(fixture.nativeElement.querySelectorAll('.pet-row').length).toBe(1);
});
```

`reload()` on the ref also advances the sequence — it fires the `onRequest` listener,
which is how the sequence mechanism detects a new call.

---

## Asserting request params

Use `.expectCalledWith()` to verify the params a component passed to the factory:

```typescript
it('sends the selected status filter', async () => {
  const fixture = TestBed.createComponent(PetsPageComponent);
  fixture.detectChanges();

  // Change the filter to 'sold'
  fixture.componentInstance.statusFilter.set('sold');
  fixture.detectChanges(); // reactive re-call fires

  // The factory was invoked twice: initial 'available' + reactive 'sold'
  expect(petsMock.calls.length).toBe(2);
  petsMock.expectCalledWith({ status: 'sold' });
});
```

`.expectCalled()` throws if the factory was never invoked at all — useful when you're
testing that a provider is wired up correctly:

```typescript
it('calls the endpoint on mount', async () => {
  const fixture = TestBed.createComponent(PetsPageComponent);
  fixture.detectChanges();
  petsMock.expectCalled();
});
```

---

## Testing multiple tokens

Mock each token independently:

```typescript
const petsMock = mockResource(FIND_PETS_BY_STATUS, { value: [] });
const addPetMock = mockResource(ADD_PET, { loading: true });

TestBed.configureTestingModule({
  imports: [PetsPageComponent],
  providers: [petsMock, addPetMock],
});
```

---

## Tip: providing the mock PETSTORE_BASE_URL

Tokens with `providedIn: 'none'` (the default) require `provideX()` helpers.
You also need the base URL token to be provided — use any string:

```typescript
import { PETSTORE_BASE_URL } from '@myapp/petstore-data-access';

TestBed.configureTestingModule({
  imports: [PetsPageComponent],
  providers: [
    { provide: PETSTORE_BASE_URL, useValue: 'http://localhost' },
    petsMock,
    // Note: you DON'T need provideFindPetsByStatus() — the mock replaces it
  ],
});
```

---

## Next

[Guide 4 — E2E tests with Playwright →](./04-e2e-tests.md)
