import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import {
  splitCallOptions,
  type ResourceCallOptions,
  type ResourceRefFor,
} from '../request-options';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type LogoutUserOptions = ResourceCallOptions<unknown>;

export type LogoutUserFn = <O extends LogoutUserOptions = LogoutUserOptions>(
  options?: O,
) => ResourceRefFor<unknown, O>;

export const LOGOUT_USER = new InjectionToken<LogoutUserFn>('LOGOUT_USER');

export function provideLogoutUser(): FactoryProvider {
  return {
    provide: LOGOUT_USER,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return ((options?: LogoutUserOptions) => {
        const _opts = splitCallOptions<unknown>(options);
        return httpResource<unknown>(() => {
          return {
            ..._opts.request,
            url: `${base}/user/logout`,
            headers: {
              ..._opts.headers,
            },
          };
        }, _opts.resource);
      }) as LogoutUserFn;
    },
  };
}
