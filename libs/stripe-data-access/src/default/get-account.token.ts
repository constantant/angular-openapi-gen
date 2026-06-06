import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { STRIPE_BASE_URL } from '../api-base-url.token';

export type GetAccountParams =
  paths['/v1/account']['get']['parameters']['query'];

export type GetAccountResponse =
  paths['/v1/account']['get']['responses']['200']['content']['application/json'];

export const GET_ACCOUNT = new InjectionToken<
  (
    params?: GetAccountParams | (() => GetAccountParams | undefined),
  ) => ReturnType<typeof httpResource<GetAccountResponse>>
>('GET_ACCOUNT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(STRIPE_BASE_URL);
    return (params?: GetAccountParams | (() => GetAccountParams | undefined)) =>
      httpResource<GetAccountResponse>(() => ({
        url: `${base}/v1/account`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
