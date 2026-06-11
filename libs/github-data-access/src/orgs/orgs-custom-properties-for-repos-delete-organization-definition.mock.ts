import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CUSTOM_PROPERTIES_FOR_REPOS_DELETE_ORGANIZATION_DEFINITION } from './orgs-custom-properties-for-repos-delete-organization-definition.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'orgs/custom-properties-for-repos-delete-organization-definition',
  path: '/orgs/{org}/properties/schema/{custom_property_name}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsCustomPropertiesForReposDeleteOrganizationDefinitionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CUSTOM_PROPERTIES_FOR_REPOS_DELETE_ORGANIZATION_DEFINITION,
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_DELETE_ORGANIZATION_DEFINITION',
    initialBehavior,
    _meta,
  );
}
