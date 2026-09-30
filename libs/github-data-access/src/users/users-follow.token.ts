import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersFollowError =
  | paths['/user/following/{username}']['put']['responses']['401']['content']['application/json']
  | paths['/user/following/{username}']['put']['responses']['403']['content']['application/json']
  | paths['/user/following/{username}']['put']['responses']['404']['content']['application/json']
  | paths['/user/following/{username}']['put']['responses']['422']['content']['application/json'];

export const USERS_FOLLOW = new InjectionToken<
  (username: string) => Observable<unknown>
>('USERS_FOLLOW');

export function provideUsersFollow(): FactoryProvider {
  return {
    provide: USERS_FOLLOW,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (username: string) =>
        http.request<unknown>('PUT', `${base}/user/following/${username}`, {});
    },
  };
}
