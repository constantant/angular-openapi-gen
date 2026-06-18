import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposDeclineInvitationForAuthenticatedUserError =
  | paths['/user/repository_invitations/{invitation_id}']['delete']['responses']['403']['content']['application/json']
  | paths['/user/repository_invitations/{invitation_id}']['delete']['responses']['404']['content']['application/json']
  | paths['/user/repository_invitations/{invitation_id}']['delete']['responses']['409']['content']['application/json'];

export const REPOS_DECLINE_INVITATION_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (invitationId: string) => ReturnType<typeof httpResource<unknown>>
  >('REPOS_DECLINE_INVITATION_FOR_AUTHENTICATED_USER');

export function provideReposDeclineInvitationForAuthenticatedUser(): FactoryProvider {
  return {
    provide: REPOS_DECLINE_INVITATION_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (invitationId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/repository_invitations/${invitationId}`,
          method: 'DELETE',
        }));
    },
  };
}
