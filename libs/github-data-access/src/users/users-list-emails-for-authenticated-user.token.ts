import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListEmailsForAuthenticatedUserParams =
  paths['/user/emails']['get']['parameters']['query'];

type UsersListEmailsForAuthenticatedUserResponse =
  paths['/user/emails']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_EMAILS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?: UsersListEmailsForAuthenticatedUserParams,
  ) => ReturnType<
    typeof httpResource<UsersListEmailsForAuthenticatedUserResponse>
  >
>('USERS_LIST_EMAILS_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (params?: UsersListEmailsForAuthenticatedUserParams) =>
      httpResource<UsersListEmailsForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/emails`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
