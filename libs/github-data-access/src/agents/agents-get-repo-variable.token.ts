import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsGetRepoVariableResponse =
  paths['/repos/{owner}/{repo}/agents/variables/{name}']['get']['responses']['200']['content']['application/json'];

export const AGENTS_GET_REPO_VARIABLE = new InjectionToken<
  (
    owner: string,
    repo: string,
    name: string,
  ) => ReturnType<typeof httpResource<AgentsGetRepoVariableResponse>>
>('AGENTS_GET_REPO_VARIABLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, name: string) =>
      httpResource<AgentsGetRepoVariableResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/agents/variables/${name}`,
      }));
  },
});
