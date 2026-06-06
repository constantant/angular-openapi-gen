import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAppsSecretsFindParams =
  paths['/v1/apps/secrets/find']['get']['parameters']['query'];

export type GetAppsSecretsFindResponse =
  paths['/v1/apps/secrets/find']['get']['responses']['200']['content']['application/json'];

export const GET_APPS_SECRETS_FIND = new InjectionToken<
  (
    params?:
      | GetAppsSecretsFindParams
      | (() => GetAppsSecretsFindParams | undefined),
  ) => ReturnType<typeof httpResource<GetAppsSecretsFindResponse>>
>('GET_APPS_SECRETS_FIND', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      params?:
        | GetAppsSecretsFindParams
        | (() => GetAppsSecretsFindParams | undefined),
    ) =>
      httpResource<GetAppsSecretsFindResponse>(() => ({
        url: `${base}/v1/apps/secrets/find`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
