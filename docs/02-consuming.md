# 2 — Consuming tokens in components

This guide covers every pattern you'll encounter when using generated tokens in Angular
components: plain GET, conditional requests, path params, header params, mutations, and
security tokens.

All examples use the Petstore data-access lib generated in [Guide 1](./01-setup.md).

---

## The basic pattern

Every generated token's factory returns a function. You call that function once — usually
in the component field initializer — and it returns an `HttpResourceRef<T>`:

```typescript
@Component({ ... })
export class PetsPageComponent {
  private findPetsByStatus = inject(FIND_PETS_BY_STATUS);

  readonly pets = this.findPetsByStatus({ status: 'available' });
  //                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //                                    plain params object — fires immediately
}
```

```html
@if (pets.isLoading()) {
  <mat-progress-bar mode="indeterminate" />
}

@for (pet of pets.value() ?? []; track pet.id) {
  <p>{{ pet.name }} — {{ pet.status }}</p>
}

@if (pets.error()) {
  <p class="error">Failed to load pets</p>
}
```

The resource signals — `.value()`, `.isLoading()`, `.error()` — integrate directly with
`@if` / `@for`. No subscription or manual change detection needed.

---

## Reactive params (thunk pattern)

When params depend on a signal, pass a **thunk** — a function that returns the params.
`httpResource` re-fires the request automatically whenever any signal inside the thunk changes:

```typescript
@Component({ ... })
export class PetsPageComponent {
  private findPetsByStatus = inject(FIND_PETS_BY_STATUS);

  readonly statusFilter = signal<'available' | 'pending' | 'sold'>('available');

  // Re-fetches whenever statusFilter() changes
  readonly pets = this.findPetsByStatus(() => ({ status: this.statusFilter() }));
}
```

```html
<mat-chip-listbox [(value)]="statusFilter">
  <mat-chip-option value="available">Available</mat-chip-option>
  <mat-chip-option value="pending">Pending</mat-chip-option>
  <mat-chip-option value="sold">Sold</mat-chip-option>
</mat-chip-listbox>
```

---

## Conditional requests — suppressing a request

Return `undefined` from the thunk to keep the resource **idle** (no HTTP request).
The resource re-fires the moment the thunk starts returning a value:

```typescript
@Component({ ... })
export class SearchComponent {
  private youtubeFn = inject(YOUTUBE_SEARCH_LIST);

  readonly query = signal('');
  readonly apiKey = signal<string | null>(null);

  // No request until both query and apiKey are set
  readonly results = this.youtubeFn(() =>
    this.query() && this.apiKey()
      ? { q: this.query(), key: this.apiKey()!, part: 'snippet', maxResults: 10 }
      : undefined
  );
}
```

When `undefined` is returned the resource stays in `'idle'` status — `.isLoading()` is
`false` and `.value()` is `undefined`. No need to null-guard the URL string or use
`switchMap`.

---

## Path params

Path params (`/pet/{petId}`) become required positional arguments on the returned function.
Provide them directly — the generator interpolates them into the URL inside the reactive lambda:

```typescript
@Component({ ... })
export class PetDetailComponent {
  private getPetById = inject(GET_PET_BY_ID);

  readonly petId = input.required<string>();

  // Path param as plain value — re-fetches if petId input changes
  readonly pet = this.getPetById(this.petId);
  //                              ^^^^^^^^^^^^
  //                              can be a plain value or a signal
}
```

When the path param itself comes from a signal (or `input()`) and you also need optional
query params, use a thunk:

```typescript
readonly pet = this.getPetById(() => this.petId());
```

---

## Header params

`in: header` parameters (e.g. `X-Api-Version`) become named string arguments placed after
path params in the generated function signature:

```typescript
// Generated signature (example):
// (xApiVersion: string, acceptLanguage?: string, params?: ListReportsParams)

readonly reports = this.listReports('2024-01', 'en-GB', { page: 1, limit: 20 });
```

Optional header params use conditional spreading inside the resource lambda — no header is
sent when you pass `undefined`.

---

## Mutations (POST / PUT / PATCH / DELETE)

Mutation tokens have a slightly different factory signature: the returned function accepts a
`body` as its first argument (after any path params). You can pass a plain value or a signal.

### JSON body

```typescript
@Component({ ... })
export class AddPetComponent {
  private addPet = inject(ADD_PET);

  readonly formValue = signal<AddPetBody>({
    name: '',
    status: 'available',
    photoUrls: [],
  });

  // Resource re-posts whenever formValue() changes
  readonly result = this.addPet(this.formValue);
}
```

For a button-triggered mutation, use a `WritableSignal` and set it on click:

```typescript
readonly pendingPet = signal<AddPetBody | null>(null);

// Suppress the request until the user clicks Submit
readonly result = this.addPet(() => this.pendingPet() ?? undefined);

onSubmit(pet: AddPetBody): void {
  this.pendingPet.set(pet);
}
```

### `multipart/form-data` body

The body type from the spec describes field shapes. Angular's `HttpClient` requires an
actual `FormData` at runtime — cast with `as unknown as BodyType`:

```typescript
@Component({ ... })
export class UploadComponent {
  private uploadFile = inject(UPLOAD_FILE);
  readonly selectedFile = signal<File | null>(null);

  private readonly formData = computed(() => {
    const file = this.selectedFile();
    if (!file) return null;
    const fd = new FormData();
    fd.append('file', file);
    return fd as unknown as UploadFileBody;
  });

  readonly upload = this.uploadFile('42', () => this.formData() ?? undefined);
  //                                 ^^^^  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //                                 petId (path param)   body thunk (idle when null)
}
```

---

## Security tokens

### Bearer / OAuth2

When the spec declares a `bearerAuth` or `oauth2` scheme, the generator emits an
`InjectionToken<Signal<string | null>>`:

```typescript
// oauth2.security-token.ts (generated)
export const OAUTH2 = new InjectionToken<Signal<string | null>>('OAUTH2');
```

Each endpoint token injects it optionally and reads it inside the reactive lambda:

```typescript
// Inside the generated httpResource lambda (simplified):
const oauth2 = inject(OAUTH2, { optional: true });
headers: {
  ...(oauth2?.() != null ? { Authorization: `Bearer ${oauth2()}` } : {}),
},
```

Because the signal is read inside the lambda, changing the token value **automatically
re-fires** any resource that uses it — no manual reload needed.

To wire it up, provide any `Signal<string | null>`:

```typescript
// app.config.ts
import { signal } from '@angular/core';
import { OAUTH2 } from '@myapp/petstore-data-access';

export const ACCESS_TOKEN = new InjectionToken<WritableSignal<string | null>>(
  'ACCESS_TOKEN',
  { providedIn: 'root', factory: () => signal(null) },
);

// providers array:
{ provide: OAUTH2, useFactory: () => inject(ACCESS_TOKEN) }
```

Then in your auth service (or wherever you receive tokens):

```typescript
@Component({ ... })
export class LoginComponent {
  private token = inject(ACCESS_TOKEN);

  onLoginSuccess(accessToken: string): void {
    this.token.set(accessToken);
    // Every resource that reads OAUTH2 re-fires automatically
  }

  onLogout(): void {
    this.token.set(null);
  }
}
```

### API key (header / query)

Same pattern — `InjectionToken<Signal<string | null>>`. The generated lambda puts the key
in the appropriate header or query param:

```typescript
export const API_KEY = new InjectionToken<Signal<string | null>>('API_KEY');

// In providers:
{ provide: API_KEY, useFactory: () => inject(MY_API_KEY_SIGNAL) }
```

---

## Sharing a resource between components

Each call to the factory function creates an independent `httpResource` instance — two
components calling `this.findPetsByStatus(...)` fire two separate HTTP requests.

To share, hoist the resource into a root-scoped token:

```typescript
// pets.store.ts
export const PETS_STORE = new InjectionToken<{
  statusFilter: WritableSignal<'available' | 'pending' | 'sold'>;
  pets: ReturnType<typeof httpResource<FindPetsByStatusResponse>>;
}>('PETS_STORE', {
  providedIn: 'root',
  factory: () => {
    const findPetsByStatus = inject(FIND_PETS_BY_STATUS);
    const statusFilter = signal<'available' | 'pending' | 'sold'>('available');
    return {
      statusFilter,
      pets: findPetsByStatus(() => ({ status: statusFilter() })),
    };
  },
});
```

Components then inject `PETS_STORE` — one HTTP request, many consumers.

---

## Next

[Guide 3 — Unit tests with `/testing` →](./03-unit-tests.md)
