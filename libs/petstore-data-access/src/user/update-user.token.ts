import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type UpdateUserBody = NonNullable<
  paths['/user/{username}']['put']['requestBody']
>['content']['application/json'];

type UpdateUserResponse =
  paths['/user/{username}']['put']['responses']['200']['content']['application/json'];

export const UPDATE_USER = new InjectionToken<
  (
    username: string,
    body: UpdateUserBody | Signal<UpdateUserBody>,
  ) => ReturnType<typeof httpResource<UpdateUserResponse>>
>('UPDATE_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (username: string, body: UpdateUserBody | Signal<UpdateUserBody>) =>
      httpResource<UpdateUserResponse>(() => ({
        url: `${base}/user/${username}`,
        method: 'PUT',
        body,
      }));
  },
});
