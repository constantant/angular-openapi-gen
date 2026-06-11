import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITION } from './orgs-custom-properties-for-repos-create-or-update-organization-definition.token';
import type { OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionResponse } from './orgs-custom-properties-for-repos-create-or-update-organization-definition.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'orgs/custom-properties-for-repos-create-or-update-organization-definition',
  path: '/orgs/{org}/properties/schema/{custom_property_name}',
  method: 'put',
  tag: 'orgs',
};

export function provideOrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITION,
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITION',
    initialBehavior,
    _meta,
  );
}
