import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersGetByUsernameResponse =
  paths['/users/{username}']['get']['responses']['200']['content']['application/json'];

export const USERS_GET_BY_USERNAME = new InjectionToken<
  (
    username: string,
  ) => ReturnType<typeof httpResource<UsersGetByUsernameResponse>>
>('USERS_GET_BY_USERNAME', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (username: string) =>
      httpResource<UsersGetByUsernameResponse>(() => ({
        url: `${base}/users/${username}`,
      }));
  },
});
