import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListBlockedUsersParams =
  paths['/orgs/{org}/blocks']['get']['parameters']['query'];

export type OrgsListBlockedUsersResponse =
  paths['/orgs/{org}/blocks']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_BLOCKED_USERS = new InjectionToken<
  (
    org: string,
    params?:
      | OrgsListBlockedUsersParams
      | (() => OrgsListBlockedUsersParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListBlockedUsersResponse>>
>('ORGS_LIST_BLOCKED_USERS');

export function provideOrgsListBlockedUsers(): FactoryProvider {
  return {
    provide: ORGS_LIST_BLOCKED_USERS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsListBlockedUsersParams
          | (() => OrgsListBlockedUsersParams | undefined),
      ) =>
        httpResource<OrgsListBlockedUsersResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/blocks`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
