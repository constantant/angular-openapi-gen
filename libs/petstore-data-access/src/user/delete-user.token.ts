import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import {
  splitCallOptions,
  type ResourceCallOptions,
  type ResourceRefFor,
} from '../request-options';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type DeleteUserOptions = ResourceCallOptions<unknown>;

export type DeleteUserFn = <O extends DeleteUserOptions = DeleteUserOptions>(
  username: string,
  options?: O,
) => ResourceRefFor<unknown, O>;

export const DELETE_USER = new InjectionToken<DeleteUserFn>('DELETE_USER');

export function provideDeleteUser(): FactoryProvider {
  return {
    provide: DELETE_USER,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return ((username: string, options?: DeleteUserOptions) => {
        const _opts = splitCallOptions<unknown>(options);
        return httpResource<unknown>(() => {
          return {
            ..._opts.request,
            url: `${base}/user/${username}`,
            method: 'DELETE',
            headers: {
              ..._opts.headers,
            },
          };
        }, _opts.resource);
      }) as DeleteUserFn;
    },
  };
}
