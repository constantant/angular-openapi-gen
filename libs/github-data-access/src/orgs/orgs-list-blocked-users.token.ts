import { InjectionToken, inject } from '@angular/core';
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
>('ORGS_LIST_BLOCKED_USERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | OrgsListBlockedUsersParams
        | (() => OrgsListBlockedUsersParams | undefined),
    ) =>
      httpResource<OrgsListBlockedUsersResponse>(() => ({
        url: `${base}/orgs/${org}/blocks`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
