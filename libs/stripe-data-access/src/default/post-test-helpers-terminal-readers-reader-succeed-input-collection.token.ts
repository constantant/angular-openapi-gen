import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTestHelpersTerminalReadersReaderSucceedInputCollectionBody =
  NonNullable<
    paths['/v1/test_helpers/terminal/readers/{reader}/succeed_input_collection']['post']['requestBody']
  >['content']['application/x-www-form-urlencoded'];

export type PostTestHelpersTerminalReadersReaderSucceedInputCollectionResponse =
  paths['/v1/test_helpers/terminal/readers/{reader}/succeed_input_collection']['post']['responses']['200']['content']['application/json'];

export const POST_TEST_HELPERS_TERMINAL_READERS_READER_SUCCEED_INPUT_COLLECTION =
  new InjectionToken<
    (
      reader: string,
      body:
        | PostTestHelpersTerminalReadersReaderSucceedInputCollectionBody
        | Signal<PostTestHelpersTerminalReadersReaderSucceedInputCollectionBody>,
    ) => ReturnType<
      typeof httpResource<PostTestHelpersTerminalReadersReaderSucceedInputCollectionResponse>
    >
  >('POST_TEST_HELPERS_TERMINAL_READERS_READER_SUCCEED_INPUT_COLLECTION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(STRIPE_BASE_URL);
      return (
        reader: string,
        body:
          | PostTestHelpersTerminalReadersReaderSucceedInputCollectionBody
          | Signal<PostTestHelpersTerminalReadersReaderSucceedInputCollectionBody>,
      ) =>
        httpResource<PostTestHelpersTerminalReadersReaderSucceedInputCollectionResponse>(
          () => ({
            url: `${base}/v1/test_helpers/terminal/readers/${reader}/succeed_input_collection`,
            method: 'POST',
            body,
          }),
        );
    },
  });
