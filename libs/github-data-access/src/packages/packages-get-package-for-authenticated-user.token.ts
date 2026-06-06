import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesGetPackageForAuthenticatedUserResponse =
  paths['/user/packages/{package_type}/{package_name}']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_GET_PACKAGE_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    packageType: string,
    packageName: string,
  ) => ReturnType<
    typeof httpResource<PackagesGetPackageForAuthenticatedUserResponse>
  >
>('PACKAGES_GET_PACKAGE_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (packageType: string, packageName: string) =>
      httpResource<PackagesGetPackageForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/packages/${packageType}/${packageName}`,
      }));
  },
});
