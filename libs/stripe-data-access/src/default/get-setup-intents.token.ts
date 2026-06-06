import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSetupIntentsParams =
  paths['/v1/setup_intents']['get']['parameters']['query'];

export type GetSetupIntentsResponse =
  paths['/v1/setup_intents']['get']['responses']['200']['content']['application/json'];

export const GET_SETUP_INTENTS = new InjectionToken<
  (
    params?: GetSetupIntentsParams | (() => GetSetupIntentsParams | undefined),
  ) => ReturnType<typeof httpResource<GetSetupIntentsResponse>>
>('GET_SETUP_INTENTS');

export function provideGetSetupIntents(): FactoryProvider {
  return {
    provide: GET_SETUP_INTENTS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        params?:
          | GetSetupIntentsParams
          | (() => GetSetupIntentsParams | undefined),
      ) =>
        httpResource<GetSetupIntentsResponse>(() => ({
          url: `${base}/v1/setup_intents`,
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
