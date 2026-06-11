import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_STOP_FOR_AUTHENTICATED_USER } from './codespaces-stop-for-authenticated-user.token';
import type { CodespacesStopForAuthenticatedUserResponse } from './codespaces-stop-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/stop-for-authenticated-user',
  path: '/user/codespaces/{codespace_name}/stop',
  method: 'post',
  tag: 'codespaces',
};

export function provideCodespacesStopForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesStopForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_STOP_FOR_AUTHENTICATED_USER,
    'CODESPACES_STOP_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
