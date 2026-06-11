import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_UPDATE_FOR_AUTHENTICATED_USER } from './codespaces-update-for-authenticated-user.token';
import type { CodespacesUpdateForAuthenticatedUserResponse } from './codespaces-update-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/update-for-authenticated-user',
  path: '/user/codespaces/{codespace_name}',
  method: 'patch',
  tag: 'codespaces',
};

export function provideCodespacesUpdateForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesUpdateForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_UPDATE_FOR_AUTHENTICATED_USER,
    'CODESPACES_UPDATE_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
