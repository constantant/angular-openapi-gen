import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const PACKAGES_DELETE_PACKAGE_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      packageType: string,
      packageName: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('PACKAGES_DELETE_PACKAGE_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (packageType: string, packageName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/user/packages/${packageType}/${packageName}`,
          method: 'DELETE',
        }));
    },
  });
