import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListSocialAccountsForUserParams =
  paths['/users/{username}/social_accounts']['get']['parameters']['query'];

type UsersListSocialAccountsForUserResponse =
  paths['/users/{username}/social_accounts']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER = new InjectionToken<
  (
    username: string,
    params?: UsersListSocialAccountsForUserParams,
  ) => ReturnType<typeof httpResource<UsersListSocialAccountsForUserResponse>>
>('USERS_LIST_SOCIAL_ACCOUNTS_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, params?: UsersListSocialAccountsForUserParams) =>
      httpResource<UsersListSocialAccountsForUserResponse>(() => ({
        url: `${base}/users/${username}/social_accounts`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
