import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListWebhookDeliveriesParams =
  paths['/orgs/{org}/hooks/{hook_id}/deliveries']['get']['parameters']['query'];

export type OrgsListWebhookDeliveriesResponse =
  paths['/orgs/{org}/hooks/{hook_id}/deliveries']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_WEBHOOK_DELIVERIES = new InjectionToken<
  (
    org: string,
    hookId: string,
    params?:
      | OrgsListWebhookDeliveriesParams
      | (() => OrgsListWebhookDeliveriesParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListWebhookDeliveriesResponse>>
>('ORGS_LIST_WEBHOOK_DELIVERIES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      hookId: string,
      params?:
        | OrgsListWebhookDeliveriesParams
        | (() => OrgsListWebhookDeliveriesParams | undefined),
    ) =>
      httpResource<OrgsListWebhookDeliveriesResponse>(() => ({
        url: `${base}/orgs/${org}/hooks/${hookId}/deliveries`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
