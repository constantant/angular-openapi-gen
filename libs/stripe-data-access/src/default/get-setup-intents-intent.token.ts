import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetSetupIntentsIntentParams =
  paths['/v1/setup_intents/{intent}']['get']['parameters']['query'];

export type GetSetupIntentsIntentResponse =
  paths['/v1/setup_intents/{intent}']['get']['responses']['200']['content']['application/json'];

export const GET_SETUP_INTENTS_INTENT = new InjectionToken<
  (
    intent: string,
    params?:
      | GetSetupIntentsIntentParams
      | (() => GetSetupIntentsIntentParams | undefined),
  ) => ReturnType<typeof httpResource<GetSetupIntentsIntentResponse>>
>('GET_SETUP_INTENTS_INTENT');

export function provideGetSetupIntentsIntent(): FactoryProvider {
  return {
    provide: GET_SETUP_INTENTS_INTENT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        intent: string,
        params?:
          | GetSetupIntentsIntentParams
          | (() => GetSetupIntentsIntentParams | undefined),
      ) =>
        httpResource<GetSetupIntentsIntentResponse>(() => ({
          url: `${base}/v1/setup_intents/${intent}`,
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
