import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type PostTerminalReadersReaderCollectInputsBody = NonNullable<
  paths['/v1/terminal/readers/{reader}/collect_inputs']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type PostTerminalReadersReaderCollectInputsResponse =
  paths['/v1/terminal/readers/{reader}/collect_inputs']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_READERS_READER_COLLECT_INPUTS = new InjectionToken<
  (
    reader: string,
    body:
      | PostTerminalReadersReaderCollectInputsBody
      | Signal<PostTerminalReadersReaderCollectInputsBody>,
  ) => ReturnType<
    typeof httpResource<PostTerminalReadersReaderCollectInputsResponse>
  >
>('POST_TERMINAL_READERS_READER_COLLECT_INPUTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      reader: string,
      body:
        | PostTerminalReadersReaderCollectInputsBody
        | Signal<PostTerminalReadersReaderCollectInputsBody>,
    ) =>
      httpResource<PostTerminalReadersReaderCollectInputsResponse>(() => ({
        url: `${base}/v1/terminal/readers/${reader}/collect_inputs`,
        method: 'POST',
        body,
      }));
  },
});
