import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersListPublicEmailsForAuthenticatedUserParams =
  paths['/user/public_emails']['get']['parameters']['query'];

type UsersListPublicEmailsForAuthenticatedUserResponse =
  paths['/user/public_emails']['get']['responses']['200']['content']['application/json'];

export const USERS_LIST_PUBLIC_EMAILS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      params?: UsersListPublicEmailsForAuthenticatedUserParams,
    ) => ReturnType<
      typeof httpResource<UsersListPublicEmailsForAuthenticatedUserResponse>
    >
  >('USERS_LIST_PUBLIC_EMAILS_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (params?: UsersListPublicEmailsForAuthenticatedUserParams) =>
        httpResource<UsersListPublicEmailsForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/public_emails`,
          params: params as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  });
