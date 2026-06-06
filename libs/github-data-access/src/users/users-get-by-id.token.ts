import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersGetByIdResponse =
  paths['/user/{account_id}']['get']['responses']['200']['content']['application/json'];

export const USERS_GET_BY_ID = new InjectionToken<
  (accountId: string) => ReturnType<typeof httpResource<UsersGetByIdResponse>>
>('USERS_GET_BY_ID', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (accountId: string) =>
      httpResource<UsersGetByIdResponse>(() => ({
        url: `${base}/user/${accountId}`,
      }));
  },
});
