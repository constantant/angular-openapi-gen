import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostSetupIntentsIntentConfirmBody = NonNullable<
  paths['/v1/setup_intents/{intent}/confirm']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostSetupIntentsIntentConfirmResponse =
  paths['/v1/setup_intents/{intent}/confirm']['post']['responses']['200']['content']['application/json'];

export const POST_SETUP_INTENTS_INTENT_CONFIRM = new InjectionToken<
  (
    intent: string,
    body:
      | PostSetupIntentsIntentConfirmBody
      | Signal<PostSetupIntentsIntentConfirmBody>,
  ) => ReturnType<typeof httpResource<PostSetupIntentsIntentConfirmResponse>>
>('POST_SETUP_INTENTS_INTENT_CONFIRM', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      intent: string,
      body:
        | PostSetupIntentsIntentConfirmBody
        | Signal<PostSetupIntentsIntentConfirmBody>,
    ) =>
      httpResource<PostSetupIntentsIntentConfirmResponse>(() => ({
        url: `${base}/v1/setup_intents/${intent}/confirm`,
        method: 'POST',
        body,
      }));
  },
});
