import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListForUserParams =
  paths['/users/{username}/orgs']['get']['parameters']['query'];

export type OrgsListForUserResponse =
  paths['/users/{username}/orgs']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: OrgsListForUserParams | (() => OrgsListForUserParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListForUserResponse>>
>('ORGS_LIST_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      username: string,
      params?:
        | OrgsListForUserParams
        | (() => OrgsListForUserParams | undefined),
    ) =>
      httpResource<OrgsListForUserResponse>(() => ({
        url: `${base}/users/${username}/orgs`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
