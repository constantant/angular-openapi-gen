import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCustomPropertiesForReposGetOrganizationDefinitionResponse =
  paths['/orgs/{org}/properties/schema/{custom_property_name}']['get']['responses']['200']['content']['application/json'];

export const ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITION =
  new InjectionToken<
    (
      org: string,
      customPropertyName: string,
    ) => ReturnType<
      typeof httpResource<OrgsCustomPropertiesForReposGetOrganizationDefinitionResponse>
    >
  >('ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITION', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, customPropertyName: string) =>
        httpResource<OrgsCustomPropertiesForReposGetOrganizationDefinitionResponse>(
          () => ({
            url: `${base}/orgs/${org}/properties/schema/${customPropertyName}`,
          }),
        );
    },
  });
