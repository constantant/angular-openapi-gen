import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type DeleteEphemeralKeysKeyBody = NonNullable<
  paths['/v1/ephemeral_keys/{key}']['delete']['requestBody']
>['content']['application/x-www-form-urlencoded'];

export type DeleteEphemeralKeysKeyResponse =
  paths['/v1/ephemeral_keys/{key}']['delete']['responses']['200']['content']['application/json'];

export const DELETE_EPHEMERAL_KEYS_KEY = new InjectionToken<
  (
    key: string,
    body: DeleteEphemeralKeysKeyBody | Signal<DeleteEphemeralKeysKeyBody>,
  ) => ReturnType<typeof httpResource<DeleteEphemeralKeysKeyResponse>>
>('DELETE_EPHEMERAL_KEYS_KEY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (
      key: string,
      body: DeleteEphemeralKeysKeyBody | Signal<DeleteEphemeralKeysKeyBody>,
    ) =>
      httpResource<DeleteEphemeralKeysKeyResponse>(() => ({
        url: `${base}/v1/ephemeral_keys/${key}`,
        method: 'DELETE',
        body,
      }));
  },
});
