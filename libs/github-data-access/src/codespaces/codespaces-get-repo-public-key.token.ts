import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesGetRepoPublicKeyResponse =
  paths['/repos/{owner}/{repo}/codespaces/secrets/public-key']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_GET_REPO_PUBLIC_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<CodespacesGetRepoPublicKeyResponse>>
>('CODESPACES_GET_REPO_PUBLIC_KEY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<CodespacesGetRepoPublicKeyResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/codespaces/secrets/public-key`,
      }));
  },
});
