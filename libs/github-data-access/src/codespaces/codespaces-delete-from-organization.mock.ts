import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_DELETE_FROM_ORGANIZATION } from './codespaces-delete-from-organization.token';
import type { CodespacesDeleteFromOrganizationResponse } from './codespaces-delete-from-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/delete-from-organization',
  path: '/orgs/{org}/members/{username}/codespaces/{codespace_name}',
  method: 'delete',
  tag: 'codespaces',
};

export function provideCodespacesDeleteFromOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesDeleteFromOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_DELETE_FROM_ORGANIZATION,
    'CODESPACES_DELETE_FROM_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
