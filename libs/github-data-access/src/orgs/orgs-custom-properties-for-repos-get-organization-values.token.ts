import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCustomPropertiesForReposGetOrganizationValuesParams =
  paths['/orgs/{org}/properties/values']['get']['parameters']['query'];

export type OrgsCustomPropertiesForReposGetOrganizationValuesResponse =
  paths['/orgs/{org}/properties/values']['get']['responses']['200']['content']['application/json'];

export const ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_VALUES =
  new InjectionToken<
    (
      org: string,
      params?:
        | OrgsCustomPropertiesForReposGetOrganizationValuesParams
        | (() =>
            | OrgsCustomPropertiesForReposGetOrganizationValuesParams
            | undefined),
    ) => ReturnType<
      typeof httpResource<OrgsCustomPropertiesForReposGetOrganizationValuesResponse>
    >
  >('ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_VALUES');

export function provideOrgsCustomPropertiesForReposGetOrganizationValues(): FactoryProvider {
  return {
    provide: ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_VALUES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | OrgsCustomPropertiesForReposGetOrganizationValuesParams
          | (() =>
              | OrgsCustomPropertiesForReposGetOrganizationValuesParams
              | undefined),
      ) =>
        httpResource<OrgsCustomPropertiesForReposGetOrganizationValuesResponse>(
          () => {
            const _params = typeof params === 'function' ? params() : params;
            if (typeof params === 'function' && _params === undefined)
              return undefined;
            return {
              url: `${base}/orgs/${org}/properties/values`,
              params: _params as unknown as Record<
                string,
                | string
                | number
                | boolean
                | readonly (string | number | boolean)[]
              >,
            };
          },
        );
    },
  };
}
