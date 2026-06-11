import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITIONS } from './orgs-custom-properties-for-repos-create-or-update-organization-definitions.token';
import type { OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsResponse } from './orgs-custom-properties-for-repos-create-or-update-organization-definitions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'orgs/custom-properties-for-repos-create-or-update-organization-definitions',
  path: '/orgs/{org}/properties/schema',
  method: 'patch',
  tag: 'orgs',
};

export function provideOrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITIONS,
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITIONS',
    initialBehavior,
    _meta,
  );
}
