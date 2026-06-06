import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_DELETE = new InjectionToken<
  (org: string) => ReturnType<typeof httpResource<unknown>>
>('ORGS_DELETE');

export function provideOrgsDelete(): FactoryProvider {
  return {
    provide: ORGS_DELETE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}`,
          method: 'DELETE',
        }));
    },
  };
}
