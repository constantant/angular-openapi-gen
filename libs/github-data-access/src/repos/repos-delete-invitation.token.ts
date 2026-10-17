import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { trackResource } from '../mock-hook';

export const REPOS_DELETE_INVITATION = new InjectionToken<
  (
    owner: string,
    repo: string,
    invitationId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_INVITATION');

export function provideReposDeleteInvitation(): FactoryProvider {
  return {
    provide: REPOS_DELETE_INVITATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, invitationId: string) =>
        trackResource(
          'REPOS_DELETE_INVITATION',
          httpResource<unknown>(() => ({
            url: `${base}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/invitations/${encodeURIComponent(invitationId)}`,
            method: 'DELETE',
          })),
        );
    },
  };
}
