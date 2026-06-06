import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const USERS_UNBLOCK = new InjectionToken<
  (username: string) => ReturnType<typeof httpResource<unknown>>
>('USERS_UNBLOCK');

export function provideUsersUnblock(): FactoryProvider {
  return {
    provide: USERS_UNBLOCK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (username: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/blocks/${username}`,
          method: 'DELETE',
        }));
    },
  };
}
