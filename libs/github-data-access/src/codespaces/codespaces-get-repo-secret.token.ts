import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesGetRepoSecretResponse =
  paths['/repos/{owner}/{repo}/codespaces/secrets/{secret_name}']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_GET_REPO_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<CodespacesGetRepoSecretResponse>>
>('CODESPACES_GET_REPO_SECRET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, secretName: string) =>
      httpResource<CodespacesGetRepoSecretResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/codespaces/secrets/${secretName}`,
      }));
  },
});
