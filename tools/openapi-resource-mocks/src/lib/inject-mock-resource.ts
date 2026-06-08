import { inject } from '@angular/core';
import { MockResourceBus } from './mock-resource-bus';
import type { MockResourceRef } from './mock-resource-ref';

export function injectMockResource<T>(key: string): MockResourceRef<T> {
  const bus = inject(MockResourceBus);
  const ref = bus.get<T>(key);
  if (!ref) {
    throw new Error(
      `[openapi-resource-mocks] No mock registered for key "${key}". ` +
        `Ensure provideMockResource(token, "${key}") is in the providers array ` +
        `before calling injectMockResource("${key}").`,
    );
  }
  return ref;
}
