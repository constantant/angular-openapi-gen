import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalReadersReaderSetReaderDisplayBody = NonNullable<
  paths['/v1/terminal/readers/{reader}/set_reader_display']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalReadersReaderSetReaderDisplayResponse =
  paths['/v1/terminal/readers/{reader}/set_reader_display']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_READERS_READER_SET_READER_DISPLAY =
  new InjectionToken<
    (
      reader: string,
      body:
        | PostTerminalReadersReaderSetReaderDisplayBody
        | Signal<PostTerminalReadersReaderSetReaderDisplayBody>,
    ) => ReturnType<
      typeof httpResource<PostTerminalReadersReaderSetReaderDisplayResponse>
    >
  >('POST_TERMINAL_READERS_READER_SET_READER_DISPLAY');

export function providePostTerminalReadersReaderSetReaderDisplay(): FactoryProvider {
  return {
    provide: POST_TERMINAL_READERS_READER_SET_READER_DISPLAY,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reader: string,
        body:
          | PostTerminalReadersReaderSetReaderDisplayBody
          | Signal<PostTerminalReadersReaderSetReaderDisplayBody>,
      ) =>
        httpResource<PostTerminalReadersReaderSetReaderDisplayResponse>(() => ({
          url: `${base}/v1/terminal/readers/${reader}/set_reader_display`,
          method: 'POST',
          body,
        }));
    },
  };
}
