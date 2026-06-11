import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITION } from './orgs-custom-properties-for-repos-get-organization-definition.token';
import type { OrgsCustomPropertiesForReposGetOrganizationDefinitionResponse } from './orgs-custom-properties-for-repos-get-organization-definition.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/custom-properties-for-repos-get-organization-definition',
  path: '/orgs/{org}/properties/schema/{custom_property_name}',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsCustomPropertiesForReposGetOrganizationDefinitionMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCustomPropertiesForReposGetOrganizationDefinitionResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITION,
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_DEFINITION',
    initialBehavior,
    _meta,
  );
}
