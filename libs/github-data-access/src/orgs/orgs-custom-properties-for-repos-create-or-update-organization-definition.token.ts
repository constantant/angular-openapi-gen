import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionBody =
  NonNullable<
    paths['/orgs/{org}/properties/schema/{custom_property_name}']['put']['requestBody']
  >['content']['application/json'];

export type OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionResponse =
  paths['/orgs/{org}/properties/schema/{custom_property_name}']['put']['responses']['200']['content']['application/json'];

export const ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITION =
  new InjectionToken<
    (
      org: string,
      customPropertyName: string,
      body:
        | OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionBody
        | Signal<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionBody>,
    ) => ReturnType<
      typeof httpResource<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionResponse>
    >
  >(
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITION',
  );

export function provideOrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinition(): FactoryProvider {
  return {
    provide:
      ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        customPropertyName: string,
        body:
          | OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionBody
          | Signal<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionBody>,
      ) =>
        httpResource<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionResponse>(
          () => ({
            url: `${base}/orgs/${org}/properties/schema/${customPropertyName}`,
            method: 'PUT',
            body,
          }),
        );
    },
  };
}
