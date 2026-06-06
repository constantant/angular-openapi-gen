import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListForAuthenticatedUserParams =
  paths['/user/repos']['get']['parameters']['query'];

type ReposListForAuthenticatedUserResponse =
  paths['/user/repos']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?: ReposListForAuthenticatedUserParams,
  ) => ReturnType<typeof httpResource<ReposListForAuthenticatedUserResponse>>
>('REPOS_LIST_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (params?: ReposListForAuthenticatedUserParams) =>
      httpResource<ReposListForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/repos`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
