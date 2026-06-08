import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITION } from './orgs-custom-properties-for-repos-get-organization-definition.token';
import type { OrgsCustomPropertiesForReposGetOrganizationDefinitionResponse } from './orgs-custom-properties-for-repos-get-organization-definition.token';

export function provideOrgsCustomPropertiesForReposGetOrganizationDefinitionMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCustomPropertiesForReposGetOrganizationDefinitionResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITION,
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITION',
    initialBehavior,
  );
}
