import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsUpdatePatAccessesBody = NonNullable<
  paths['/orgs/{org}/personal-access-tokens']['post']['requestBody']
>['content']['application/json'];

export type OrgsUpdatePatAccessesResponse =
  paths['/orgs/{org}/personal-access-tokens']['post']['responses']['202']['content']['application/json'];

export const ORGS_UPDATE_PAT_ACCESSES = new InjectionToken<
  (
    org: string,
    body: OrgsUpdatePatAccessesBody | Signal<OrgsUpdatePatAccessesBody>,
  ) => ReturnType<typeof httpResource<OrgsUpdatePatAccessesResponse>>
>('ORGS_UPDATE_PAT_ACCESSES');

export function provideOrgsUpdatePatAccesses(): FactoryProvider {
  return {
    provide: ORGS_UPDATE_PAT_ACCESSES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body: OrgsUpdatePatAccessesBody | Signal<OrgsUpdatePatAccessesBody>,
      ) =>
        httpResource<OrgsUpdatePatAccessesResponse>(() => ({
          url: `${base}/orgs/${org}/personal-access-tokens`,
          method: 'POST',
          body,
        }));
    },
  };
}
