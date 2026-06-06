import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostSetupIntentsIntentBody = NonNullable<
  paths['/v1/setup_intents/{intent}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostSetupIntentsIntentResponse =
  paths['/v1/setup_intents/{intent}']['post']['responses']['200']['content']['application/json'];

export const POST_SETUP_INTENTS_INTENT = new InjectionToken<
  (
    intent: string,
    body: PostSetupIntentsIntentBody | Signal<PostSetupIntentsIntentBody>,
  ) => ReturnType<typeof httpResource<PostSetupIntentsIntentResponse>>
>('POST_SETUP_INTENTS_INTENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      intent: string,
      body: PostSetupIntentsIntentBody | Signal<PostSetupIntentsIntentBody>,
    ) =>
      httpResource<PostSetupIntentsIntentResponse>(() => ({
        url: `${base}/v1/setup_intents/${intent}`,
        method: 'POST',
        body,
      }));
  },
});
