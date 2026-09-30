import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersCheckPersonIsFollowedByAuthenticatedError =
  | paths['/user/following/{username}']['get']['responses']['401']['content']['application/json']
  | paths['/user/following/{username}']['get']['responses']['403']['content']['application/json']
  | paths['/user/following/{username}']['get']['responses']['404']['content']['application/json'];

export const USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED =
  new InjectionToken<(username: string) => Observable<unknown>>(
    'USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED',
  );

export function provideUsersCheckPersonIsFollowedByAuthenticated(): FactoryProvider {
  return {
    provide: USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (username: string) =>
        http.request<unknown>('GET', `${base}/user/following/${username}`, {});
    },
  };
}
