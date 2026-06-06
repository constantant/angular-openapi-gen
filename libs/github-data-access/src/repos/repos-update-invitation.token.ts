import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposUpdateInvitationBody = NonNullable<
  paths['/repos/{owner}/{repo}/invitations/{invitation_id}']['patch']['requestBody']
>['content']['application/json'];

type ReposUpdateInvitationResponse =
  paths['/repos/{owner}/{repo}/invitations/{invitation_id}']['patch']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_INVITATION = new InjectionToken<
  (
    owner: string,
    repo: string,
    invitation_id: string,
    body: ReposUpdateInvitationBody | Signal<ReposUpdateInvitationBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateInvitationResponse>>
>('REPOS_UPDATE_INVITATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      invitation_id: string,
      body: ReposUpdateInvitationBody | Signal<ReposUpdateInvitationBody>,
    ) =>
      httpResource<ReposUpdateInvitationResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/invitations/${invitation_id}`,
        method: 'PATCH',
        body,
      }));
  },
});
