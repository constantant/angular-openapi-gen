import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCustomPropertiesForReposGetOrganizationDefinitionsResponse =
  paths['/orgs/{org}/properties/schema']['get']['responses']['200']['content']['application/json'];

export const ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITIONS =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<OrgsCustomPropertiesForReposGetOrganizationDefinitionsResponse>
    >
  >('ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITIONS');

export function provideOrgsCustomPropertiesForReposGetOrganizationDefinitions(): FactoryProvider {
  return {
    provide: ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<OrgsCustomPropertiesForReposGetOrganizationDefinitionsResponse>(
          () => ({
            url: `${base}/orgs/${org}/properties/schema`,
          }),
        );
    },
  };
}
