import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetRepoVariableResponse =
  paths['/repos/{owner}/{repo}/actions/variables/{name}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_REPO_VARIABLE = new InjectionToken<
  (
    owner: string,
    repo: string,
    name: string,
  ) => ReturnType<typeof httpResource<ActionsGetRepoVariableResponse>>
>('ACTIONS_GET_REPO_VARIABLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, name: string) =>
      httpResource<ActionsGetRepoVariableResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/variables/${name}`,
      }));
  },
});
