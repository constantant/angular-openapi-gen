import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListWebhooksParams =
  paths['/repos/{owner}/{repo}/hooks']['get']['parameters']['query'];

export type ReposListWebhooksResponse =
  paths['/repos/{owner}/{repo}/hooks']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_WEBHOOKS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposListWebhooksParams
      | (() => ReposListWebhooksParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListWebhooksResponse>>
>('REPOS_LIST_WEBHOOKS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | ReposListWebhooksParams
        | (() => ReposListWebhooksParams | undefined),
    ) =>
      httpResource<ReposListWebhooksResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/hooks`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
