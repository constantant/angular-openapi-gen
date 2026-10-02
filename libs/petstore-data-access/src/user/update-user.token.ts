import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import {
  splitCallOptions,
  type ResourceCallOptions,
  type ResourceRefFor,
} from '../request-options';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type UpdateUserBody = NonNullable<
  paths['/user/{username}']['put']['requestBody']
>['content']['application/json'];

export type UpdateUserOptions = ResourceCallOptions<unknown>;

export type UpdateUserFn = <O extends UpdateUserOptions = UpdateUserOptions>(
  username: string,
  body: UpdateUserBody | Signal<UpdateUserBody>,
  options?: O,
) => ResourceRefFor<unknown, O>;

export const UPDATE_USER = new InjectionToken<UpdateUserFn>('UPDATE_USER');

export function provideUpdateUser(): FactoryProvider {
  return {
    provide: UPDATE_USER,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return ((
        username: string,
        body: UpdateUserBody | Signal<UpdateUserBody>,
        options?: UpdateUserOptions,
      ) => {
        const _opts = splitCallOptions<unknown>(options);
        return httpResource<unknown>(() => {
          const _body =
            typeof body === 'function'
              ? (body as Signal<UpdateUserBody>)()
              : body;
          return {
            ..._opts.request,
            url: `${base}/user/${username}`,
            method: 'PUT',
            body: _body,
            headers: {
              ..._opts.headers,
            },
          };
        }, _opts.resource);
      }) as UpdateUserFn;
    },
  };
}
