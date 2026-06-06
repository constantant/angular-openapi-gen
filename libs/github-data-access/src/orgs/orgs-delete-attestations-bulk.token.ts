import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsDeleteAttestationsBulkBody = NonNullable<
  paths['/orgs/{org}/attestations/delete-request']['post']['requestBody']
>['content']['application/json'];

export const ORGS_DELETE_ATTESTATIONS_BULK = new InjectionToken<
  (
    org: string,
    body:
      | OrgsDeleteAttestationsBulkBody
      | Signal<OrgsDeleteAttestationsBulkBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_DELETE_ATTESTATIONS_BULK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body:
        | OrgsDeleteAttestationsBulkBody
        | Signal<OrgsDeleteAttestationsBulkBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/attestations/delete-request`,
        method: 'POST',
        body,
      }));
  },
});
