import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type GistsListForUserParams =
  paths['/users/{username}/gists']['get']['parameters']['query'];

export type GistsListForUserResponse =
  paths['/users/{username}/gists']['get']['responses']['200']['content']['application/json'];

export const GISTS_LIST_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | GistsListForUserParams
      | (() => GistsListForUserParams | undefined),
  ) => ReturnType<typeof httpResource<GistsListForUserResponse>>
>('GISTS_LIST_FOR_USER');

export function provideGistsListForUser(): FactoryProvider {
  return {
    provide: GISTS_LIST_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | GistsListForUserParams
          | (() => GistsListForUserParams | undefined),
      ) =>
        httpResource<GistsListForUserResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/users/${username}/gists`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
