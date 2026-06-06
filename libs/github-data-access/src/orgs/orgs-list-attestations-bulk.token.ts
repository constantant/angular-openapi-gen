import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListAttestationsBulkBody = NonNullable<
  paths['/orgs/{org}/attestations/bulk-list']['post']['requestBody']
>['content']['application/json'];

export type OrgsListAttestationsBulkResponse =
  paths['/orgs/{org}/attestations/bulk-list']['post']['responses']['200']['content']['application/json'];

export const ORGS_LIST_ATTESTATIONS_BULK = new InjectionToken<
  (
    org: string,
    body: OrgsListAttestationsBulkBody | Signal<OrgsListAttestationsBulkBody>,
  ) => ReturnType<typeof httpResource<OrgsListAttestationsBulkResponse>>
>('ORGS_LIST_ATTESTATIONS_BULK');

export function provideOrgsListAttestationsBulk(): FactoryProvider {
  return {
    provide: ORGS_LIST_ATTESTATIONS_BULK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | OrgsListAttestationsBulkBody
          | Signal<OrgsListAttestationsBulkBody>,
      ) =>
        httpResource<OrgsListAttestationsBulkResponse>(() => ({
          url: `${base}/orgs/${org}/attestations/bulk-list`,
          method: 'POST',
          body,
        }));
    },
  };
}
