import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListWebhookDeliveriesParams =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries']['get']['parameters']['query'];

type ReposListWebhookDeliveriesResponse =
  paths['/repos/{owner}/{repo}/hooks/{hook_id}/deliveries']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_WEBHOOK_DELIVERIES = new InjectionToken<
  (
    owner: string,
    repo: string,
    hook_id: string,
    params?: ReposListWebhookDeliveriesParams,
  ) => ReturnType<typeof httpResource<ReposListWebhookDeliveriesResponse>>
>('REPOS_LIST_WEBHOOK_DELIVERIES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      hook_id: string,
      params?: ReposListWebhookDeliveriesParams,
    ) =>
      httpResource<ReposListWebhookDeliveriesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/hooks/${hook_id}/deliveries`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
