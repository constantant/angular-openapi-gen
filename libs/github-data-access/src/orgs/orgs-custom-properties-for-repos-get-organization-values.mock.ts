import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_VALUES } from './orgs-custom-properties-for-repos-get-organization-values.token';
import type { OrgsCustomPropertiesForReposGetOrganizationValuesResponse } from './orgs-custom-properties-for-repos-get-organization-values.token';

export function provideOrgsCustomPropertiesForReposGetOrganizationValuesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCustomPropertiesForReposGetOrganizationValuesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_VALUES,
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_VALUES',
    initialBehavior,
  );
}
