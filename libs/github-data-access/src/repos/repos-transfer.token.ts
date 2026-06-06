import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposTransferBody = NonNullable<
  paths['/repos/{owner}/{repo}/transfer']['post']['requestBody']
>['content']['application/json'];

export const REPOS_TRANSFER = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposTransferBody | Signal<ReposTransferBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_TRANSFER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: ReposTransferBody | Signal<ReposTransferBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/transfer`,
        method: 'POST',
        body,
      }));
  },
});
