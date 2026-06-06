import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type GetSetupIntentsParams =
  paths['/v1/setup_intents']['get']['parameters']['query'];

type GetSetupIntentsResponse =
  paths['/v1/setup_intents']['get']['responses']['200']['content']['application/json'];

export const GET_SETUP_INTENTS = new InjectionToken<
  (
    params?: GetSetupIntentsParams,
  ) => ReturnType<typeof httpResource<GetSetupIntentsResponse>>
>('GET_SETUP_INTENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetSetupIntentsParams) =>
      httpResource<GetSetupIntentsResponse>(() => ({
        url: `${base}/v1/setup_intents`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
