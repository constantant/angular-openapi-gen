import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PackagesGetPackageForUserResponse =
  paths['/users/{username}/packages/{package_type}/{package_name}']['get']['responses']['200']['content']['application/json'];

export const PACKAGES_GET_PACKAGE_FOR_USER = new InjectionToken<
  (
    packageType: string,
    packageName: string,
    username: string,
  ) => ReturnType<typeof httpResource<PackagesGetPackageForUserResponse>>
>('PACKAGES_GET_PACKAGE_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (packageType: string, packageName: string, username: string) =>
      httpResource<PackagesGetPackageForUserResponse>(() => ({
        url: `${base}/users/${username}/packages/${packageType}/${packageName}`,
      }));
  },
});
