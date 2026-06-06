import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListInvitationsParams =
  paths['/repos/{owner}/{repo}/invitations']['get']['parameters']['query'];

type ReposListInvitationsResponse =
  paths['/repos/{owner}/{repo}/invitations']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_INVITATIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListInvitationsParams,
  ) => ReturnType<typeof httpResource<ReposListInvitationsResponse>>
>('REPOS_LIST_INVITATIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, params?: ReposListInvitationsParams) =>
      httpResource<ReposListInvitationsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/invitations`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
