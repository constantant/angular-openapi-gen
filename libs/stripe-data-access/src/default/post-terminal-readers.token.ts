import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTerminalReadersBody = NonNullable<
  paths['/v1/terminal/readers']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTerminalReadersResponse =
  paths['/v1/terminal/readers']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_READERS = new InjectionToken<
  (
    body: PostTerminalReadersBody | Signal<PostTerminalReadersBody>,
  ) => ReturnType<typeof httpResource<PostTerminalReadersResponse>>
>('POST_TERMINAL_READERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (body: PostTerminalReadersBody | Signal<PostTerminalReadersBody>) =>
      httpResource<PostTerminalReadersResponse>(() => ({
        url: `${base}/v1/terminal/readers`,
        method: 'POST',
        body,
      }));
  },
});
