import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_SET_CODESPACES_ACCESS_USERS } from './codespaces-set-codespaces-access-users.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/set-codespaces-access-users',
  path: '/orgs/{org}/codespaces/access/selected_users',
  method: 'post',
  tag: 'codespaces',
};

export function provideCodespacesSetCodespacesAccessUsersMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_SET_CODESPACES_ACCESS_USERS,
    'CODESPACES_SET_CODESPACES_ACCESS_USERS',
    initialBehavior,
    _meta,
  );
}
