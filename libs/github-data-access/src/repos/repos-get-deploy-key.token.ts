import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetDeployKeyResponse =
  paths['/repos/{owner}/{repo}/keys/{key_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_DEPLOY_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
    key_id: string,
  ) => ReturnType<typeof httpResource<ReposGetDeployKeyResponse>>
>('REPOS_GET_DEPLOY_KEY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, key_id: string) =>
      httpResource<ReposGetDeployKeyResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/keys/${key_id}`,
      }));
  },
});
