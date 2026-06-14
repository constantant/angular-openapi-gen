import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type LicensesGetResponse =
  paths['/licenses/{license}']['get']['responses']['200']['content']['application/json'];

export const LICENSES_GET = new InjectionToken<
  (license: string) => ReturnType<typeof httpResource<LicensesGetResponse>>
>('LICENSES_GET');

export function provideLicensesGet(): FactoryProvider {
  return {
    provide: LICENSES_GET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (license: string) =>
        httpResource<LicensesGetResponse>(() => ({
          url: `${base}/licenses/${license}`,
        }));
    },
  };
}
