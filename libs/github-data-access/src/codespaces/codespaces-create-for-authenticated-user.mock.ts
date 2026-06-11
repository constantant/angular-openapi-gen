import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_CREATE_FOR_AUTHENTICATED_USER } from './codespaces-create-for-authenticated-user.token';
import type { CodespacesCreateForAuthenticatedUserResponse } from './codespaces-create-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/create-for-authenticated-user',
  path: '/user/codespaces',
  method: 'post',
  tag: 'codespaces',
};

export function provideCodespacesCreateForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCreateForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CREATE_FOR_AUTHENTICATED_USER,
    'CODESPACES_CREATE_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
