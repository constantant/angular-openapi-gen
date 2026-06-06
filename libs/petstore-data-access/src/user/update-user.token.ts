import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type UpdateUserBody = NonNullable<
  paths['/user/{username}']['put']['requestBody']
>['content']['application/json'];

export const UPDATE_USER = new InjectionToken<
  (
    username: string,
    body: UpdateUserBody | Signal<UpdateUserBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('UPDATE_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (username: string, body: UpdateUserBody | Signal<UpdateUserBody>) =>
      httpResource<unknown>(() => ({
        url: `${base}/user/${username}`,
        method: 'PUT',
        body,
      }));
  },
});
