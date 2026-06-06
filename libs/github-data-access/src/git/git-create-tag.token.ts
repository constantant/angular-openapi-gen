import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitCreateTagBody = NonNullable<
  paths['/repos/{owner}/{repo}/git/tags']['post']['requestBody']
>['content']['application/json'];

export type GitCreateTagResponse =
  paths['/repos/{owner}/{repo}/git/tags']['post']['responses']['201']['content']['application/json'];

export const GIT_CREATE_TAG = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: GitCreateTagBody | Signal<GitCreateTagBody>,
  ) => ReturnType<typeof httpResource<GitCreateTagResponse>>
>('GIT_CREATE_TAG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: GitCreateTagBody | Signal<GitCreateTagBody>,
    ) =>
      httpResource<GitCreateTagResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/git/tags`,
        method: 'POST',
        body,
      }));
  },
});
