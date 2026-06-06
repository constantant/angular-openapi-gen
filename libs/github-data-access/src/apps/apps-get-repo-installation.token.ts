import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AppsGetRepoInstallationResponse =
  paths['/repos/{owner}/{repo}/installation']['get']['responses']['200']['content']['application/json'];

export const APPS_GET_REPO_INSTALLATION = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<AppsGetRepoInstallationResponse>>
>('APPS_GET_REPO_INSTALLATION', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<AppsGetRepoInstallationResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/installation`,
      }));
  },
});
