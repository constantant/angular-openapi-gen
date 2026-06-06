import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ORGS_CUSTOM_PROPERTIES_FOR_REPOS_DELETE_ORGANIZATION_DEFINITION =
  new InjectionToken<
    (
      org: string,
      customPropertyName: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ORGS_CUSTOM_PROPERTIES_FOR_REPOS_DELETE_ORGANIZATION_DEFINITION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, customPropertyName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/properties/schema/${customPropertyName}`,
          method: 'DELETE',
        }));
    },
  });
