import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersUnfollowError =
  | paths['/user/following/{username}']['delete']['responses']['401']['content']['application/json']
  | paths['/user/following/{username}']['delete']['responses']['403']['content']['application/json']
  | paths['/user/following/{username}']['delete']['responses']['404']['content']['application/json'];

export const USERS_UNFOLLOW = new InjectionToken<
  (username: string) => Observable<unknown>
>('USERS_UNFOLLOW');

export function provideUsersUnfollow(): FactoryProvider {
  return {
    provide: USERS_UNFOLLOW,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (username: string) =>
        http.request<unknown>(
          'DELETE',
          `${base}/user/following/${username}`,
          {},
        );
    },
  };
}
