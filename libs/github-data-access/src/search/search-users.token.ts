import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SearchUsersParams =
  paths['/search/users']['get']['parameters']['query'];

export type SearchUsersResponse =
  paths['/search/users']['get']['responses']['200']['content']['application/json'];

export const SEARCH_USERS = new InjectionToken<
  (
    params?: SearchUsersParams | (() => SearchUsersParams | undefined),
  ) => ReturnType<typeof httpResource<SearchUsersResponse>>
>('SEARCH_USERS');

export function provideSearchUsers(): FactoryProvider {
  return {
    provide: SEARCH_USERS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?: SearchUsersParams | (() => SearchUsersParams | undefined),
      ) =>
        httpResource<SearchUsersResponse>(() => ({
          url: `${base}/search/users`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
