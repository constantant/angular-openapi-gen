import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSetupIntentsIntentCancelBody = NonNullable<
  paths['/v1/setup_intents/{intent}/cancel']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSetupIntentsIntentCancelResponse =
  paths['/v1/setup_intents/{intent}/cancel']['post']['responses']['200']['content']['application/json'];

export const POST_SETUP_INTENTS_INTENT_CANCEL = new InjectionToken<
  (
    intent: string,
    body:
      | PostSetupIntentsIntentCancelBody
      | Signal<PostSetupIntentsIntentCancelBody>,
  ) => ReturnType<typeof httpResource<PostSetupIntentsIntentCancelResponse>>
>('POST_SETUP_INTENTS_INTENT_CANCEL');

export function providePostSetupIntentsIntentCancel(): FactoryProvider {
  return {
    provide: POST_SETUP_INTENTS_INTENT_CANCEL,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        intent: string,
        body:
          | PostSetupIntentsIntentCancelBody
          | Signal<PostSetupIntentsIntentCancelBody>,
      ) =>
        httpResource<PostSetupIntentsIntentCancelResponse>(() => ({
          url: `${base}/v1/setup_intents/${intent}/cancel`,
          method: 'POST',
          body,
        }));
    },
  };
}
