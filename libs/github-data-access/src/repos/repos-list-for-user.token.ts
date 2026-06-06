import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListForUserParams =
  paths['/users/{username}/repos']['get']['parameters']['query'];

type ReposListForUserResponse =
  paths['/users/{username}/repos']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: ReposListForUserParams,
  ) => ReturnType<typeof httpResource<ReposListForUserResponse>>
>('REPOS_LIST_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, params?: ReposListForUserParams) =>
      httpResource<ReposListForUserResponse>(() => ({
        url: `${base}/users/${username}/repos`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
