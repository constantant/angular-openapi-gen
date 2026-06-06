import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateDispatchEventBody = NonNullable<
  paths['/repos/{owner}/{repo}/dispatches']['post']['requestBody']
>['content']['application/json'];

export const REPOS_CREATE_DISPATCH_EVENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ReposCreateDispatchEventBody | Signal<ReposCreateDispatchEventBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_CREATE_DISPATCH_EVENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: ReposCreateDispatchEventBody | Signal<ReposCreateDispatchEventBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/dispatches`,
        method: 'POST',
        body,
      }));
  },
});
