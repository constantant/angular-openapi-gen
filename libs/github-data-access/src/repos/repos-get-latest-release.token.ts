import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetLatestReleaseResponse =
  paths['/repos/{owner}/{repo}/releases/latest']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_LATEST_RELEASE = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetLatestReleaseResponse>>
>('REPOS_GET_LATEST_RELEASE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposGetLatestReleaseResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/releases/latest`,
      }));
  },
});
