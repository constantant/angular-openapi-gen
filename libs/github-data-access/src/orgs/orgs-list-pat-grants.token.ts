import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListPatGrantsParams =
  paths['/orgs/{org}/personal-access-tokens']['get']['parameters']['query'];

export type OrgsListPatGrantsResponse =
  paths['/orgs/{org}/personal-access-tokens']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_PAT_GRANTS = new InjectionToken<
  (
    org: string,
    params?:
      | OrgsListPatGrantsParams
      | (() => OrgsListPatGrantsParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListPatGrantsResponse>>
>('ORGS_LIST_PAT_GRANTS');

export function provideOrgsListPatGrants(): FactoryProvider {
  return {
    provide: ORGS_LIST_PAT_GRANTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsListPatGrantsParams
          | (() => OrgsListPatGrantsParams | undefined),
      ) =>
        httpResource<OrgsListPatGrantsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/personal-access-tokens`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
