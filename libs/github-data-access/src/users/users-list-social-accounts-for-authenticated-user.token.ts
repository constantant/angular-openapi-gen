import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListSocialAccountsForAuthenticatedUserParams =
  paths['/user/social_accounts']['get']['parameters']['query'];

type UsersListSocialAccountsForAuthenticatedUserResponse =
  paths['/user/social_accounts']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_SOCIAL_ACCOUNTS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?: UsersListSocialAccountsForAuthenticatedUserParams,
    ) => ReturnType<
      typeof httpResource<UsersListSocialAccountsForAuthenticatedUserResponse>
    >
  >('USERS_LIST_SOCIAL_ACCOUNTS_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (params?: UsersListSocialAccountsForAuthenticatedUserParams) =>
        httpResource<UsersListSocialAccountsForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/social_accounts`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
