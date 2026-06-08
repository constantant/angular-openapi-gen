import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListWebhooksParams =
  paths['/orgs/{org}/hooks']['get']['parameters']['query'];

export type OrgsListWebhooksResponse =
  paths['/orgs/{org}/hooks']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_WEBHOOKS = new InjectionToken<
  (
    org: string,
    params?:
      | OrgsListWebhooksParams
      | (() => OrgsListWebhooksParams | undefined),
  ) => ReturnType<typeof httpResource<OrgsListWebhooksResponse>>
>('ORGS_LIST_WEBHOOKS');

export function provideOrgsListWebhooks(): FactoryProvider {
  return {
    provide: ORGS_LIST_WEBHOOKS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsListWebhooksParams
          | (() => OrgsListWebhooksParams | undefined),
      ) =>
        httpResource<OrgsListWebhooksResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/hooks`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
