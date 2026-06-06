import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsUpdatePatAccessBody = NonNullable<
  paths['/orgs/{org}/personal-access-tokens/{pat_id}']['post']['requestBody']
>['content']['application/json'];

export const ORGS_UPDATE_PAT_ACCESS = new InjectionToken<
  (
    org: string,
    patId: string,
    body: OrgsUpdatePatAccessBody | Signal<OrgsUpdatePatAccessBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ORGS_UPDATE_PAT_ACCESS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      patId: string,
      body: OrgsUpdatePatAccessBody | Signal<OrgsUpdatePatAccessBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/personal-access-tokens/${patId}`,
        method: 'POST',
        body,
      }));
  },
});
