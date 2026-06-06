import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalConnectionTokensBody = NonNullable<
  paths['/v1/terminal/connection_tokens']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalConnectionTokensResponse =
  paths['/v1/terminal/connection_tokens']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_CONNECTION_TOKENS = new InjectionToken<
  (
    body:
      | PostTerminalConnectionTokensBody
      | Signal<PostTerminalConnectionTokensBody>,
  ) => ReturnType<typeof httpResource<PostTerminalConnectionTokensResponse>>
>('POST_TERMINAL_CONNECTION_TOKENS');

export function providePostTerminalConnectionTokens(): FactoryProvider {
  return {
    provide: POST_TERMINAL_CONNECTION_TOKENS,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        body:
          | PostTerminalConnectionTokensBody
          | Signal<PostTerminalConnectionTokensBody>,
      ) =>
        httpResource<PostTerminalConnectionTokensResponse>(() => ({
          url: `${base}/v1/terminal/connection_tokens`,
          method: 'POST',
          body,
        }));
    },
  };
}
