import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreatePagesSiteBody = NonNullable<
  paths['/repos/{owner}/{repo}/pages']['post']['requestBody']
>['content']['application/json'];

export type ReposCreatePagesSiteResponse =
  paths['/repos/{owner}/{repo}/pages']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_PAGES_SITE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreatePagesSiteBody | Signal<ReposCreatePagesSiteBody>,
  ) => ReturnType<typeof httpResource<ReposCreatePagesSiteResponse>>
>('REPOS_CREATE_PAGES_SITE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: ReposCreatePagesSiteBody | Signal<ReposCreatePagesSiteBody>,
    ) =>
      httpResource<ReposCreatePagesSiteResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pages`,
        method: 'POST',
        body,
      }));
  },
});
