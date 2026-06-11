import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_DELETE_FOR_AUTHENTICATED_USER } from './codespaces-delete-for-authenticated-user.token';
import type { CodespacesDeleteForAuthenticatedUserResponse } from './codespaces-delete-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/delete-for-authenticated-user',
  path: '/user/codespaces/{codespace_name}',
  method: 'delete',
  tag: 'codespaces',
};

export function provideCodespacesDeleteForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesDeleteForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_DELETE_FOR_AUTHENTICATED_USER,
    'CODESPACES_DELETE_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
