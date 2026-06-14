import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('ORGS_LIST_MEMBERSHIPS_FOR_AUTHENTICATED_USER');

export function provideOrgsListMembershipsForAuthenticatedUser(): FactoryProvider {
  return {
    provide: ORGS_LIST_MEMBERSHIPS_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | OrgsListMembershipsForAuthenticatedUserParams
          | (() => OrgsListMembershipsForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<OrgsListMembershipsForAuthenticatedUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/user/memberships/orgs`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
