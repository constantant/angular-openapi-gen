import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposDeleteFileBody = NonNullable<
  paths['/repos/{owner}/{repo}/contents/{path}']['delete']['requestBody']
>['content']['application/json'];

type ReposDeleteFileResponse =
  paths['/repos/{owner}/{repo}/contents/{path}']['delete']['responses']['200']['content']['application/json'];

export const REPOS_DELETE_FILE = new InjectionToken<
  (
    owner: string,
    repo: string,
    path: string,
    body: ReposDeleteFileBody | Signal<ReposDeleteFileBody>,
  ) => ReturnType<typeof httpResource<ReposDeleteFileResponse>>
>('REPOS_DELETE_FILE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      path: string,
      body: ReposDeleteFileBody | Signal<ReposDeleteFileBody>,
    ) =>
      httpResource<ReposDeleteFileResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/contents/${path}`,
        method: 'DELETE',
        body,
      }));
  },
});
