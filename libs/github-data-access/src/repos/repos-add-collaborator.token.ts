import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposAddCollaboratorBody = NonNullable<
  paths['/repos/{owner}/{repo}/collaborators/{username}']['put']['requestBody']
>['content']['application/json'];

export type ReposAddCollaboratorResponse =
  paths['/repos/{owner}/{repo}/collaborators/{username}']['put']['responses']['201']['content']['application/json'];

export const REPOS_ADD_COLLABORATOR = new InjectionToken<
  (
    owner: string,
    repo: string,
    username: string,
    body: ReposAddCollaboratorBody | Signal<ReposAddCollaboratorBody>,
  ) => ReturnType<typeof httpResource<ReposAddCollaboratorResponse>>
>('REPOS_ADD_COLLABORATOR');

export function provideReposAddCollaborator(): FactoryProvider {
  return {
    provide: REPOS_ADD_COLLABORATOR,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        username: string,
        body: ReposAddCollaboratorBody | Signal<ReposAddCollaboratorBody>,
      ) =>
        httpResource<ReposAddCollaboratorResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/collaborators/${username}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
