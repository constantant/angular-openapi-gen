import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_VALUES } from './orgs-custom-properties-for-repos-get-organization-values.token';
import type { OrgsCustomPropertiesForReposGetOrganizationValuesResponse } from './orgs-custom-properties-for-repos-get-organization-values.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/custom-properties-for-repos-get-organization-values',
  path: '/orgs/{org}/properties/values',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsCustomPropertiesForReposGetOrganizationValuesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCustomPropertiesForReposGetOrganizationValuesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_VALUES,
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_GET_ORGANIZATION_VALUES',
    initialBehavior,
    _meta,
  );
}
