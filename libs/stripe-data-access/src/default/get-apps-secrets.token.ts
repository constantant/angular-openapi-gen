import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAppsSecretsParams =
  paths['/v1/apps/secrets']['get']['parameters']['query'];

export type GetAppsSecretsResponse =
  paths['/v1/apps/secrets']['get']['responses']['200']['content']['application/json'];

export const GET_APPS_SECRETS = new InjectionToken<
  (
    params?: GetAppsSecretsParams | (() => GetAppsSecretsParams | undefined),
  ) => ReturnType<typeof httpResource<GetAppsSecretsResponse>>
>('GET_APPS_SECRETS');

export function provideGetAppsSecrets(): FactoryProvider {
  return {
    provide: GET_APPS_SECRETS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetAppsSecretsParams
          | (() => GetAppsSecretsParams | undefined),
      ) =>
        httpResource<GetAppsSecretsResponse>(() => ({
          url: `${base}/v1/apps/secrets`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
