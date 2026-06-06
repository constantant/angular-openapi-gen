import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type CreateUsersWithListInputBody = NonNullable<
  paths['/user/createWithList']['post']['requestBody']
>['content']['application/json'];

type CreateUsersWithListInputResponse =
  paths['/user/createWithList']['post']['responses']['200']['content']['application/json'];

export const CREATE_USERS_WITH_LIST_INPUT = new InjectionToken<
  (
    body: CreateUsersWithListInputBody | Signal<CreateUsersWithListInputBody>,
  ) => ReturnType<typeof httpResource<CreateUsersWithListInputResponse>>
>('CREATE_USERS_WITH_LIST_INPUT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (
      body: CreateUsersWithListInputBody | Signal<CreateUsersWithListInputBody>,
    ) =>
      httpResource<CreateUsersWithListInputResponse>(() => ({
        url: `${base}/user/createWithList`,
        method: 'POST',
        body,
      }));
  },
});
