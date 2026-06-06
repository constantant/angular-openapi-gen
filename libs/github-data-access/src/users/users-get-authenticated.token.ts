import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersGetAuthenticatedResponse =
  paths['/user']['get']['responses']['200']['content']['application/json'];

export const USERS_GET_AUTHENTICATED = new InjectionToken<
  () => ReturnType<typeof httpResource<UsersGetAuthenticatedResponse>>
>('USERS_GET_AUTHENTICATED', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return () =>
      httpResource<UsersGetAuthenticatedResponse>(() => ({
        url: `${base}/user`,
      }));
  },
});
