import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitCreateRefBody = NonNullable<
  paths['/repos/{owner}/{repo}/git/refs']['post']['requestBody']
>['content']['application/json'];

export type GitCreateRefResponse =
  paths['/repos/{owner}/{repo}/git/refs']['post']['responses']['201']['content']['application/json'];

export const GIT_CREATE_REF = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: GitCreateRefBody | Signal<GitCreateRefBody>,
  ) => ReturnType<typeof httpResource<GitCreateRefResponse>>
>('GIT_CREATE_REF', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: GitCreateRefBody | Signal<GitCreateRefBody>,
    ) =>
      httpResource<GitCreateRefResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/git/refs`,
        method: 'POST',
        body,
      }));
  },
});
