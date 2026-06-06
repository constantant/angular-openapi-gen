import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserParams =
  paths['/user/packages/{package_type}/{package_name}/versions']['get']['parameters']['query'];

export type PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserResponse =
  paths['/user/packages/{package_type}/{package_name}/versions']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_AUTHENTICATED_USER =
  new InjectionToken<
    (
      packageType: string,
      packageName: string,
      params?:
        | PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserParams
        | (() =>
            | PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserResponse>
    >
  >(
    'PACKAGES_GET_ALL_PACKAGE_VERSIONS_FOR_PACKAGE_OWNED_BY_AUTHENTICATED_USER',
    {
      providedIn: 'root',
      factory: () => {
        const base = inject(GITHUB_BASE_URL);
        return (
          packageType: string,
          packageName: string,
          params?:
            | PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserParams
            | (() =>
                | PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserParams
                | undefined),
        ) =>
          httpResource<PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserResponse>(
            () => ({
              url: `${base}/user/packages/${packageType}/${packageName}/versions`,
              params: (typeof params === 'function'
                ? params()
                : params) as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            }),
          );
      },
    },
  );
