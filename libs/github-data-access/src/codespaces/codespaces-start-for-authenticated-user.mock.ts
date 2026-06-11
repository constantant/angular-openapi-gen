import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_START_FOR_AUTHENTICATED_USER } from './codespaces-start-for-authenticated-user.token';
import type { CodespacesStartForAuthenticatedUserResponse } from './codespaces-start-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/start-for-authenticated-user',
  path: '/user/codespaces/{codespace_name}/start',
  method: 'post',
  tag: 'codespaces',
};

export function provideCodespacesStartForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesStartForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_START_FOR_AUTHENTICATED_USER,
    'CODESPACES_START_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
