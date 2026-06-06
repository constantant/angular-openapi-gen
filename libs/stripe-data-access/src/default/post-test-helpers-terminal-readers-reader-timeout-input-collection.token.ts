import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTerminalReadersReaderTimeoutInputCollectionBody =
  NonNullable<
    paths['/v1/test_helpers/terminal/readers/{reader}/timeout_input_collection']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTerminalReadersReaderTimeoutInputCollectionResponse =
  paths['/v1/test_helpers/terminal/readers/{reader}/timeout_input_collection']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TERMINAL_READERS_READER_TIMEOUT_INPUT_COLLECTION =
  new InjectionToken<
    (
      reader: string,
      body:
        | PostTestHelpersTerminalReadersReaderTimeoutInputCollectionBody
        | Signal<PostTestHelpersTerminalReadersReaderTimeoutInputCollectionBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTerminalReadersReaderTimeoutInputCollectionResponse>
    >
  >('POST_TEST_HELPERS_TERMINAL_READERS_READER_TIMEOUT_INPUT_COLLECTION');

export function providePostTestHelpersTerminalReadersReaderTimeoutInputCollection(): FactoryProvider {
  return {
    provide: POST_TEST_HELPERS_TERMINAL_READERS_READER_TIMEOUT_INPUT_COLLECTION,
    useFactory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reader: string,
        body:
          | PostTestHelpersTerminalReadersReaderTimeoutInputCollectionBody
          | Signal<PostTestHelpersTerminalReadersReaderTimeoutInputCollectionBody>,
      ) =>
        httpResource<PostTestHelpersTerminalReadersReaderTimeoutInputCollectionResponse>(
          () => ({
            url: `${base}/v1/test_helpers/terminal/readers/${reader}/timeout_input_collection`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
