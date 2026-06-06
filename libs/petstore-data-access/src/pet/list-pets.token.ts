import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export const LIST_PETS = new InjectionToken<
  () => ReturnType<typeof httpResource<unknown[]>>
>('LIST_PETS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return () =>
      httpResource<unknown[]>(() => ({ url: `${base}/pet/findByStatus`, params: { status: 'available' } }));
  },
});
