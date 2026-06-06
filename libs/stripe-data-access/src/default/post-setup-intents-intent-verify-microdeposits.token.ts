import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSetupIntentsIntentVerifyMicrodepositsBody = NonNullable<
  paths['/v1/setup_intents/{intent}/verify_microdeposits']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSetupIntentsIntentVerifyMicrodepositsResponse =
  paths['/v1/setup_intents/{intent}/verify_microdeposits']['post']['responses']['200']['content']['application/json'];

export const POST_SETUP_INTENTS_INTENT_VERIFY_MICRODEPOSITS =
  new InjectionToken<
    (
      intent: string,
      body:
        | PostSetupIntentsIntentVerifyMicrodepositsBody
        | Signal<PostSetupIntentsIntentVerifyMicrodepositsBody>,
    ) => ReturnType<
      typeof httpResource<PostSetupIntentsIntentVerifyMicrodepositsResponse>
    >
  >('POST_SETUP_INTENTS_INTENT_VERIFY_MICRODEPOSITS');

export function providePostSetupIntentsIntentVerifyMicrodeposits(): FactoryProvider {
  return {
    provide: POST_SETUP_INTENTS_INTENT_VERIFY_MICRODEPOSITS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        intent: string,
        body:
          | PostSetupIntentsIntentVerifyMicrodepositsBody
          | Signal<PostSetupIntentsIntentVerifyMicrodepositsBody>,
      ) =>
        httpResource<PostSetupIntentsIntentVerifyMicrodepositsResponse>(() => ({
          url: `${base}/v1/setup_intents/${intent}/verify_microdeposits`,
          method: 'POST',
          body,
        }));
    },
  };
}
