import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostSetupIntentsBody = NonNullable<
  paths['/v1/setup_intents']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostSetupIntentsResponse =
  paths['/v1/setup_intents']['post']['responses']['200']['content']['application/json'];

export const POST_SETUP_INTENTS = new InjectionToken<
  (
    body: PostSetupIntentsBody | Signal<PostSetupIntentsBody>,
  ) => ReturnType<typeof httpResource<PostSetupIntentsResponse>>
>('POST_SETUP_INTENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostSetupIntentsBody | Signal<PostSetupIntentsBody>) =>
      httpResource<PostSetupIntentsResponse>(() => ({
        url: `${base}/v1/setup_intents`,
        method: 'POST',
        body,
      }));
  },
});
