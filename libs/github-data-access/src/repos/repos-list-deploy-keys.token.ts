import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListDeployKeysParams =
  paths['/repos/{owner}/{repo}/keys']['get']['parameters']['query'];

type ReposListDeployKeysResponse =
  paths['/repos/{owner}/{repo}/keys']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_DEPLOY_KEYS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListDeployKeysParams,
  ) => ReturnType<typeof httpResource<ReposListDeployKeysResponse>>
>('REPOS_LIST_DEPLOY_KEYS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, params?: ReposListDeployKeysParams) =>
      httpResource<ReposListDeployKeysResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/keys`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
