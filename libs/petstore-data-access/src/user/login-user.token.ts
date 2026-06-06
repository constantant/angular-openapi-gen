import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { PETSTORE_BASE_URL } from '../api-base-url.token';

export type LoginUserParams =
  paths['/user/login']['get']['parameters']['query'];

export type LoginUserResponse =
  paths['/user/login']['get']['responses']['200']['content']['application/json'];

export const LOGIN_USER = new InjectionToken<
  (
    params?: LoginUserParams | (() => LoginUserParams | undefined),
  ) => ReturnType<typeof httpResource<LoginUserResponse>>
>('LOGIN_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(PETSTORE_BASE_URL);
    return (params?: LoginUserParams | (() => LoginUserParams | undefined)) =>
      httpResource<LoginUserResponse>(() => ({
        url: `${base}/user/login`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
