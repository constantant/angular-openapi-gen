import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetPagesHealthCheckResponse =
  paths['/repos/{owner}/{repo}/pages/health']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_PAGES_HEALTH_CHECK = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposGetPagesHealthCheckResponse>>
>('REPOS_GET_PAGES_HEALTH_CHECK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposGetPagesHealthCheckResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pages/health`,
      }));
  },
});
