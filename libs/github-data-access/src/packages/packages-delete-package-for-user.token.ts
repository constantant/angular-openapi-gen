import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const PACKAGES_DELETE_PACKAGE_FOR_USER = new InjectionToken<
  (
    packageType: string,
    packageName: string,
    username: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('PACKAGES_DELETE_PACKAGE_FOR_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (packageType: string, packageName: string, username: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/users/${username}/packages/${packageType}/${packageName}`,
        method: 'DELETE',
      }));
  },
});
