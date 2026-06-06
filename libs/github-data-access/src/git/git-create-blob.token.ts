import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GitCreateBlobBody = NonNullable<
  paths['/repos/{owner}/{repo}/git/blobs']['post']['requestBody']
>['content']['application/json'];

export type GitCreateBlobResponse =
  paths['/repos/{owner}/{repo}/git/blobs']['post']['responses']['201']['content']['application/json'];

export const GIT_CREATE_BLOB = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: GitCreateBlobBody | Signal<GitCreateBlobBody>,
  ) => ReturnType<typeof httpResource<GitCreateBlobResponse>>
>('GIT_CREATE_BLOB', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: GitCreateBlobBody | Signal<GitCreateBlobBody>,
    ) =>
      httpResource<GitCreateBlobResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/git/blobs`,
        method: 'POST',
        body,
      }));
  },
});
