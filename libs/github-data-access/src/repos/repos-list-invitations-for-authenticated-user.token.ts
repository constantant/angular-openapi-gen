import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListInvitationsForAuthenticatedUserParams =
  paths['/user/repository_invitations']['get']['parameters']['query'];

type ReposListInvitationsForAuthenticatedUserResponse =
  paths['/user/repository_invitations']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_INVITATIONS_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?: ReposListInvitationsForAuthenticatedUserParams,
  ) => ReturnType<
    typeof httpResource<ReposListInvitationsForAuthenticatedUserResponse>
  >
>('REPOS_LIST_INVITATIONS_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (params?: ReposListInvitationsForAuthenticatedUserParams) =>
      httpResource<ReposListInvitationsForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/repository_invitations`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
