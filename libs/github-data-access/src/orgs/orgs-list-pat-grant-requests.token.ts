import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListPatGrantRequestsParams =
  paths['/orgs/{org}/personal-access-token-requests']['get']['parameters']['query'];

export type OrgsListPatGrantRequestsResponse =
  paths['/orgs/{org}/personal-access-token-requests']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_PAT_GRANT_REQUESTS = new InjectionToken<
  (
    org: string,
    params?:
      | OrgsListPatGrantRequestsParams
      | (() => OrgsListPatGrantRequestsParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListPatGrantRequestsResponse>>
>('ORGS_LIST_PAT_GRANT_REQUESTS');

export function provideOrgsListPatGrantRequests(): FactoryProvider {
  return {
    provide: ORGS_LIST_PAT_GRANT_REQUESTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsListPatGrantRequestsParams
          | (() => OrgsListPatGrantRequestsParams | undefined),
      ) =>
        httpResource<OrgsListPatGrantRequestsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/personal-access-token-requests`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
