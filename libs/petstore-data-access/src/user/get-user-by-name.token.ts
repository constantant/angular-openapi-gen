import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type GetUserByNameResponse =
  paths['/user/{username}']['get']['responses']['200']['content']['application/json'];

export const GET_USER_BY_NAME = new InjectionToken<
  (username: string) => ReturnType<typeof httpResource<GetUserByNameResponse>>
>('GET_USER_BY_NAME');

export function provideGetUserByName(): FactoryProvider {
  return {
    provide: GET_USER_BY_NAME,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return (username: string) =>
        httpResource<GetUserByNameResponse>(() => ({
          url: `${base}/user/${username}`,
        }));
    },
  };
}
