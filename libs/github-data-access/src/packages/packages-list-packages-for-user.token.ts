import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesListPackagesForUserParams =
  paths['/users/{username}/packages']['get']['parameters']['query'];

export type PackagesListPackagesForUserResponse =
  paths['/users/{username}/packages']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_LIST_PACKAGES_FOR_USER = new InjectionToken<
  (
    username: string,
    params?:
      | PackagesListPackagesForUserParams
      | (() => PackagesListPackagesForUserParams | undefined),
  ) => ReturnType<typeof httpResource<PackagesListPackagesForUserResponse>>
>('PACKAGES_LIST_PACKAGES_FOR_USER');

export function providePackagesListPackagesForUser(): FactoryProvider {
  return {
    provide: PACKAGES_LIST_PACKAGES_FOR_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        params?:
          | PackagesListPackagesForUserParams
          | (() => PackagesListPackagesForUserParams | undefined),
      ) =>
        httpResource<PackagesListPackagesForUserResponse>(() => ({
          url: `${base}/users/${username}/packages`,
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
