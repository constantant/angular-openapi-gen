import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersBlockError =
  | paths['/user/blocks/{username}']['put']['responses']['401']['content']['application/json']
  | paths['/user/blocks/{username}']['put']['responses']['403']['content']['application/json']
  | paths['/user/blocks/{username}']['put']['responses']['404']['content']['application/json']
  | paths['/user/blocks/{username}']['put']['responses']['422']['content']['application/json'];

export const USERS_BLOCK = new InjectionToken<
  (username: string) => ReturnType<typeof httpResource<unknown>>
>('USERS_BLOCK');

export function provideUsersBlock(): FactoryProvider {
  return {
    provide: USERS_BLOCK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (username: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/blocks/${username}`,
          method: 'PUT',
        }));
    },
  };
}
