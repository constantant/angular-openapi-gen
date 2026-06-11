import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_DELETE_CODESPACES_ACCESS_USERS } from './codespaces-delete-codespaces-access-users.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/delete-codespaces-access-users',
  path: '/orgs/{org}/codespaces/access/selected_users',
  method: 'delete',
  tag: 'codespaces',
};

export function provideCodespacesDeleteCodespacesAccessUsersMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_DELETE_CODESPACES_ACCESS_USERS,
    'CODESPACES_DELETE_CODESPACES_ACCESS_USERS',
    initialBehavior,
    _meta,
  );
}
