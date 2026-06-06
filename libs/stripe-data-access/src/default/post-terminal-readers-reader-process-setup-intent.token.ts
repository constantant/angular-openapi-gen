import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalReadersReaderProcessSetupIntentBody = NonNullable<
  paths['/v1/terminal/readers/{reader}/process_setup_intent']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalReadersReaderProcessSetupIntentResponse =
  paths['/v1/terminal/readers/{reader}/process_setup_intent']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_READERS_READER_PROCESS_SETUP_INTENT =
  new InjectionToken<
    (
      reader: string,
      body:
        | PostTerminalReadersReaderProcessSetupIntentBody
        | Signal<PostTerminalReadersReaderProcessSetupIntentBody>,
    ) => ReturnType<
      typeof httpResource<PostTerminalReadersReaderProcessSetupIntentResponse>
    >
  >('POST_TERMINAL_READERS_READER_PROCESS_SETUP_INTENT');

export function providePostTerminalReadersReaderProcessSetupIntent(): FactoryProvider {
  return {
    provide: POST_TERMINAL_READERS_READER_PROCESS_SETUP_INTENT,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reader: string,
        body:
          | PostTerminalReadersReaderProcessSetupIntentBody
          | Signal<PostTerminalReadersReaderProcessSetupIntentBody>,
      ) =>
        httpResource<PostTerminalReadersReaderProcessSetupIntentResponse>(
          () => ({
            url: `${base}/v1/terminal/readers/${reader}/process_setup_intent`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
