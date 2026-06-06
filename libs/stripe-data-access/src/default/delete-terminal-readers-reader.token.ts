import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

type DeleteTerminalReadersReaderBody = NonNullable<
  paths['/v1/terminal/readers/{reader}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

type DeleteTerminalReadersReaderResponse =
  paths['/v1/terminal/readers/{reader}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_TERMINAL_READERS_READER = new InjectionToken<
  (
    reader: string,
    body:
      | DeleteTerminalReadersReaderBody
      | Signal<DeleteTerminalReadersReaderBody>,
  ) => ReturnType<typeof httpResource<DeleteTerminalReadersReaderResponse>>
>('DELETE_TERMINAL_READERS_READER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      reader: string,
      body:
        | DeleteTerminalReadersReaderBody
        | Signal<DeleteTerminalReadersReaderBody>,
    ) =>
      httpResource<DeleteTerminalReadersReaderResponse>(() => ({
        url: `${base}/v1/terminal/readers/${reader}`,
        method: 'DELETE',
        body,
      }));
  },
});
