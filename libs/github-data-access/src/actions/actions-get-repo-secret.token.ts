import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetRepoSecretResponse =
  paths['/repos/{owner}/{repo}/actions/secrets/{secret_name}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_REPO_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<ActionsGetRepoSecretResponse>>
>('ACTIONS_GET_REPO_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, secretName: string) =>
      httpResource<ActionsGetRepoSecretResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/actions/secrets/${secretName}`,
      }));
  },
});
