import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const USERS_CHECK_FOLLOWING_FOR_USER = new InjectionToken<
  (username: string, targetUser: string) => Observable<unknown>
>('USERS_CHECK_FOLLOWING_FOR_USER');

export function provideUsersCheckFollowingForUser(): FactoryProvider {
  return {
    provide: USERS_CHECK_FOLLOWING_FOR_USER,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (username: string, targetUser: string) =>
        http.request<unknown>(
          'GET',
          `${base}/users/${username}/following/${targetUser}`,
          {},
        );
    },
  };
}
