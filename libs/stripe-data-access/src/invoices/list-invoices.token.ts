import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export const LIST_INVOICES = new InjectionToken<
  () => ReturnType<typeof httpResource<unknown>>
>('LIST_INVOICES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return () =>
      httpResource<unknown>(() => ({ url: `${base}/invoices` }));
  },
});
