import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListWebhookDeliveriesParams =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries']['get']['parameters']['query'];

export type ReposListWebhookDeliveriesResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_WEBHOOK_DELIVERIES = new InjectionToken<
  (
    owner: string,
    repo: string,
    hookId: string,
    params?:
      | ReposListWebhookDeliveriesParams
      | (() => ReposListWebhookDeliveriesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListWebhookDeliveriesResponse>>
>('REPOS_LIST_WEBHOOK_DELIVERIES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      hookId: string,
      params?:
        | ReposListWebhookDeliveriesParams
        | (() => ReposListWebhookDeliveriesParams | undefined),
    ) =>
      httpResource<ReposListWebhookDeliveriesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/hooks/${hookId}/deliveries`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
