import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITIONS } from './orgs-custom-properties-for-repos-get-organization-definitions.token';
import type { OrgsCustomPropertiesForReposGetOrganizationDefinitionsResponse } from './orgs-custom-properties-for-repos-get-organization-definitions.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/custom-properties-for-repos-get-organization-definitions',
  path: '/orgs/{org}/properties/schema',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsCustomPropertiesForReposGetOrganizationDefinitionsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCustomPropertiesForReposGetOrganizationDefinitionsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITIONS,
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITIONS',
    initialBehavior,
    _meta,
  );
}
