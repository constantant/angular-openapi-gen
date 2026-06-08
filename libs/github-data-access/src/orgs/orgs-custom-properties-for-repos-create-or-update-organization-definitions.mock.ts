import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITIONS } from './orgs-custom-properties-for-repos-create-or-update-organization-definitions.token';
import type { OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsResponse } from './orgs-custom-properties-for-repos-create-or-update-organization-definitions.token';

export function provideOrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITIONS,
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITIONS',
    initialBehavior,
  );
}
