import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposAddCollaboratorBody = NonNullable<
  paths['/repos/{owner}/{repo}/collaborators/{username}']['put']['requestBody']
>['content']['application/json'];

type ReposAddCollaboratorResponse =
  paths['/repos/{owner}/{repo}/collaborators/{username}']['put']['responses']['201']['content']['application/json'];

export const REPOS_ADD_COLLABORATOR = new InjectionToken<
  (
    owner: string,
    repo: string,
    username: string,
    body: ReposAddCollaboratorBody | Signal<ReposAddCollaboratorBody>,
  ) => ReturnType<typeof httpResource<ReposAddCollaboratorResponse>>
>('REPOS_ADD_COLLABORATOR', {
  providedIn: 'root',
  factory: () => {
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
});
