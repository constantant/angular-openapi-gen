import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetCollaboratorPermissionLevelResponse =
  paths['/repos/{owner}/{repo}/collaborators/{username}/permission']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_COLLABORATOR_PERMISSION_LEVEL = new InjectionToken<
  (
    owner: string,
    repo: string,
    username: string,
  ) => ReturnType<
    typeof httpResource<ReposGetCollaboratorPermissionLevelResponse>
  >
>('REPOS_GET_COLLABORATOR_PERMISSION_LEVEL', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, username: string) =>
      httpResource<ReposGetCollaboratorPermissionLevelResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/collaborators/${username}/permission`,
      }));
  },
});
