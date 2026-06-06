import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export const DELETE_USER = new InjectionToken<
  (username: string) => ReturnType<typeof httpResource<unknown>>
>('DELETE_USER');

export function provideDeleteUser(): FactoryProvider {
  return {
    provide: DELETE_USER,
    useFactory: () => {
      const base = inject(PETSTORE_BASE_URL);
      return (username: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/${username}`,
          method: 'DELETE',
        }));
    },
  };
}
