import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateAutolinkBody = NonNullable<
  paths['/repos/{owner}/{repo}/autolinks']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateAutolinkResponse =
  paths['/repos/{owner}/{repo}/autolinks']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_AUTOLINK = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreateAutolinkBody | Signal<ReposCreateAutolinkBody>,
  ) => ReturnType<typeof httpResource<ReposCreateAutolinkResponse>>
>('REPOS_CREATE_AUTOLINK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: ReposCreateAutolinkBody | Signal<ReposCreateAutolinkBody>,
    ) =>
      httpResource<ReposCreateAutolinkResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/autolinks`,
        method: 'POST',
        body,
      }));
  },
});
