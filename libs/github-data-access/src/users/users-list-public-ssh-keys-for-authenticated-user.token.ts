import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListPublicSshKeysForAuthenticatedUserParams =
  paths['/user/keys']['get']['parameters']['query'];

type UsersListPublicSshKeysForAuthenticatedUserResponse =
  paths['/user/keys']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?: UsersListPublicSshKeysForAuthenticatedUserParams,
    ) => ReturnType<
      typeof httpResource<UsersListPublicSshKeysForAuthenticatedUserResponse>
    >
  >('USERS_LIST_PUBLIC_SSH_KEYS_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (params?: UsersListPublicSshKeysForAuthenticatedUserParams) =>
        httpResource<UsersListPublicSshKeysForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/keys`,
            params: params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          }),
        );
    },
  });
