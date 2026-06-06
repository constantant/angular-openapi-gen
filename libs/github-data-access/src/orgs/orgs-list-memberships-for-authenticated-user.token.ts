import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListMembershipsForAuthenticatedUserParams =
  paths['/user/memberships/orgs']['get']['parameters']['query'];

export type OrgsListMembershipsForAuthenticatedUserResponse =
  paths['/user/memberships/orgs']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_MEMBERSHIPS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | OrgsListMembershipsForAuthenticatedUserParams
      | (() => OrgsListMembershipsForAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<OrgsListMembershipsForAuthenticatedUserResponse>
  >
>('ORGS_LIST_MEMBERSHIPS_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      params?:
        | OrgsListMembershipsForAuthenticatedUserParams
        | (() => OrgsListMembershipsForAuthenticatedUserParams | undefined),
    ) =>
      httpResource<OrgsListMembershipsForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/memberships/orgs`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
