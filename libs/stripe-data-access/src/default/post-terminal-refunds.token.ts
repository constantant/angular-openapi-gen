import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTerminalRefundsBody = NonNullable<
  paths['/v1/terminal/refunds']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTerminalRefundsResponse =
  paths['/v1/terminal/refunds']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_REFUNDS = new InjectionToken<
  (
    body: PostTerminalRefundsBody | Signal<PostTerminalRefundsBody>,
  ) => ReturnType<typeof httpResource<PostTerminalRefundsResponse>>
>('POST_TERMINAL_REFUNDS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostTerminalRefundsBody | Signal<PostTerminalRefundsBody>) =>
      httpResource<PostTerminalRefundsResponse>(() => ({
        url: `${base}/v1/terminal/refunds`,
        method: 'POST',
        body,
      }));
  },
});
