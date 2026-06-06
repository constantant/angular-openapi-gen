import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED =
  new InjectionToken<
    (username: string) => ReturnType<typeof httpResource<unknown>>
  >('USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED');

export function provideUsersCheckPersonIsFollowedByAuthenticated(): FactoryProvider {
  return {
    provide: USERS_CHECK_PERSON_IS_FOLLOWED_BY_AUTHENTICATED,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (username: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/following/${username}`,
        }));
    },
  };
}
