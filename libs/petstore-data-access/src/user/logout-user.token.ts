import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

type LogoutUserResponse =
  paths['/user/logout']['get']['responses']['200']['content']['application/json'];

export const LOGOUT_USER = new InjectionToken<
  () => ReturnType<typeof httpResource<LogoutUserResponse>>
>('LOGOUT_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return () =>
      httpResource<LogoutUserResponse>(() => ({
        url: `${base}/user/logout`,
      }));
  },
});
