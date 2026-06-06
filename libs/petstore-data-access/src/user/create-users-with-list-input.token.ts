import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type CreateUsersWithListInputBody = NonNullable<
  paths['/user/createWithList']['post']['requestBody']
>['content']['application/json'];

export type CreateUsersWithListInputResponse =
  paths['/user/createWithList']['post']['responses']['200']['content']['application/json'];

export const CREATE_USERS_WITH_LIST_INPUT = new InjectionToken<
  (
    body: CreateUsersWithListInputBody | Signal<CreateUsersWithListInputBody>,
  ) => ReturnType<typeof httpResource<CreateUsersWithListInputResponse>>
>('CREATE_USERS_WITH_LIST_INPUT');

export function provideCreateUsersWithListInput(): FactoryProvider {
  return {
    provide: CREATE_USERS_WITH_LIST_INPUT,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return (
        body:
          | CreateUsersWithListInputBody
          | Signal<CreateUsersWithListInputBody>,
      ) =>
        httpResource<CreateUsersWithListInputResponse>(() => ({
          url: `${base}/user/createWithList`,
          method: 'POST',
          body,
        }));
    },
  };
}
