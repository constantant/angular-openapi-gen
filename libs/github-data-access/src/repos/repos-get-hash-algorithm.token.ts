import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetHashAlgorithmResponse =
  paths['/repos/{owner}/{repo}/hash-algorithm']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_HASH_ALGORITHM = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetHashAlgorithmResponse>>
>('REPOS_GET_HASH_ALGORITHM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposGetHashAlgorithmResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/hash-algorithm`,
      }));
  },
});
