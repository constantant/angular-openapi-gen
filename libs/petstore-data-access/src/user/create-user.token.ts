import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type CreateUserBody = NonNullable<
  paths['/user']['post']['requestBody']
>['content']['application/json'];

export type CreateUserResponse =
  paths['/user']['post']['responses']['200']['content']['application/json'];

export const CREATE_USER = new InjectionToken<
  (
    body: CreateUserBody | Signal<CreateUserBody>,
  ) => ReturnType<typeof httpResource<CreateUserResponse>>
>('CREATE_USER');

export function provideCreateUser(): FactoryProvider {
  return {
    provide: CREATE_USER,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return (body: CreateUserBody | Signal<CreateUserBody>) =>
        httpResource<CreateUserResponse>(() => ({
          url: `${base}/user`,
          method: 'POST',
          body,
        }));
    },
  };
}
