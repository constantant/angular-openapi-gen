import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesListPackagesForAuthenticatedUserParams =
  paths['/user/packages']['get']['parameters']['query'];

export type PackagesListPackagesForAuthenticatedUserResponse =
  paths['/user/packages']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_LIST_PACKAGES_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    params?:
      | PackagesListPackagesForAuthenticatedUserParams
      | (() => PackagesListPackagesForAuthenticatedUserParams | undefined),
  ) => ReturnType<
    typeof httpResource<PackagesListPackagesForAuthenticatedUserResponse>
  >
>('PACKAGES_LIST_PACKAGES_FOR_AUTHENTICATED_USER');

export function providePackagesListPackagesForAuthenticatedUser(): FactoryProvider {
  return {
    provide: PACKAGES_LIST_PACKAGES_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        params?:
          | PackagesListPackagesForAuthenticatedUserParams
          | (() => PackagesListPackagesForAuthenticatedUserParams | undefined),
      ) =>
        httpResource<PackagesListPackagesForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/packages`,
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
