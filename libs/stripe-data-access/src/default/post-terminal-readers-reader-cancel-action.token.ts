import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalReadersReaderCancelActionBody = NonNullable<
  paths['/v1/terminal/readers/{reader}/cancel_action']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalReadersReaderCancelActionResponse =
  paths['/v1/terminal/readers/{reader}/cancel_action']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_READERS_READER_CANCEL_ACTION = new InjectionToken<
  (
    reader: string,
    body:
      | PostTerminalReadersReaderCancelActionBody
      | Signal<PostTerminalReadersReaderCancelActionBody>,
  ) => ReturnType<
    typeof httpResource<PostTerminalReadersReaderCancelActionResponse>
  >
>('POST_TERMINAL_READERS_READER_CANCEL_ACTION');

export function providePostTerminalReadersReaderCancelAction(): FactoryProvider {
  return {
    provide: POST_TERMINAL_READERS_READER_CANCEL_ACTION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reader: string,
        body:
          | PostTerminalReadersReaderCancelActionBody
          | Signal<PostTerminalReadersReaderCancelActionBody>,
      ) =>
        httpResource<PostTerminalReadersReaderCancelActionResponse>(() => ({
          url: `${base}/v1/terminal/readers/${reader}/cancel_action`,
          method: 'POST',
          body,
        }));
    },
  };
}
