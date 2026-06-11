import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_LIST_FOR_AUTHENTICATED_USER } from './codespaces-list-for-authenticated-user.token';
import type { CodespacesListForAuthenticatedUserResponse } from './codespaces-list-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/list-for-authenticated-user',
  path: '/user/codespaces',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesListForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesListForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_LIST_FOR_AUTHENTICATED_USER,
    'CODESPACES_LIST_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
