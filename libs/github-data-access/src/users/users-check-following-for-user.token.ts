import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const USERS_CHECK_FOLLOWING_FOR_USER = new InjectionToken<
  (
    username: string,
    target_user: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('USERS_CHECK_FOLLOWING_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string, target_user: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/users/${username}/following/${target_user}`,
      }));
  },
});
