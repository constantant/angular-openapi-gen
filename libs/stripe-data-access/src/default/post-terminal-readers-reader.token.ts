import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type PostTerminalReadersReaderBody = NonNullable<
  paths['/v1/terminal/readers/{reader}']['post']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type PostTerminalReadersReaderResponse =
  paths['/v1/terminal/readers/{reader}']['post']['responses']['200']['content']['application/json'];

export const POST_TERMINAL_READERS_READER = new InjectionToken<
  (
    reader: string,
    body: PostTerminalReadersReaderBody | Signal<PostTerminalReadersReaderBody>,
  ) => ReturnType<typeof httpResource<PostTerminalReadersReaderResponse>>
>('POST_TERMINAL_READERS_READER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      reader: string,
      body:
        | PostTerminalReadersReaderBody
        | Signal<PostTerminalReadersReaderBody>,
    ) =>
      httpResource<PostTerminalReadersReaderResponse>(() => ({
        url: `${base}/v1/terminal/readers/${reader}`,
        method: 'POST',
        body,
      }));
  },
});
