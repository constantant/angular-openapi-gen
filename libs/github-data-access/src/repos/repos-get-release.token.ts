import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetReleaseResponse =
  paths['/repos/{owner}/{repo}/releases/{release_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_RELEASE = new InjectionToken<
  (
    owner: string,
    repo: string,
    release_id: string,
  ) => ReturnType<typeof httpResource<ReposGetReleaseResponse>>
>('REPOS_GET_RELEASE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, release_id: string) =>
      httpResource<ReposGetReleaseResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/releases/${release_id}`,
      }));
  },
});
