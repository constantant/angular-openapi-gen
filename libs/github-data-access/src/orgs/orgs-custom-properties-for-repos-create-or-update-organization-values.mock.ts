import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_VALUES } from './orgs-custom-properties-for-repos-create-or-update-organization-values.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId:
    'orgs/custom-properties-for-repos-create-or-update-organization-values',
  path: '/orgs/{org}/properties/values',
  method: 'patch',
  tag: 'orgs',
};

export function provideOrgsCustomPropertiesForReposCreateOrUpdateOrganizationValuesMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_VALUES,
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_VALUES',
    initialBehavior,
    _meta,
  );
}
