import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListMembersParams =
  paths['/orgs/{org}/members']['get']['parameters']['query'];

export type OrgsListMembersResponse =
  paths['/orgs/{org}/members']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_MEMBERS = new InjectionToken<
  (
    org: string,
    params?: OrgsListMembersParams | (() => OrgsListMembersParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListMembersResponse>>
>('ORGS_LIST_MEMBERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | OrgsListMembersParams
        | (() => OrgsListMembersParams | undefined),
    ) =>
      httpResource<OrgsListMembersResponse>(() => ({
        url: `${base}/orgs/${org}/members`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
