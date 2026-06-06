import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListLanguagesResponse =
  paths['/repos/{owner}/{repo}/languages']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_LANGUAGES = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<ReposListLanguagesResponse>>
>('REPOS_LIST_LANGUAGES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<ReposListLanguagesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/languages`,
      }));
  },
});
