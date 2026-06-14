import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_DELETE_ATTESTATIONS_BY_ID = new InjectionToken<
  (
    org: string,
    attestationId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_DELETE_ATTESTATIONS_BY_ID');

export function provideOrgsDeleteAttestationsById(): FactoryProvider {
  return {
    provide: ORGS_DELETE_ATTESTATIONS_BY_ID,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, attestationId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/attestations/${attestationId}`,
          method: 'DELETE',
        }));
    },
  };
}
