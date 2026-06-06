import { InjectionToken, inject } from '@angular/core';
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
>('ORGS_LIST_PAT_GRANTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | OrgsListPatGrantsParams
        | (() => OrgsListPatGrantsParams | undefined),
    ) =>
      httpResource<OrgsListPatGrantsResponse>(() => ({
        url: `${base}/orgs/${org}/personal-access-tokens`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
