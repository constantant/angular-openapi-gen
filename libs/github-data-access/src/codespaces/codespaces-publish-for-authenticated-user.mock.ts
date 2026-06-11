import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_PUBLISH_FOR_AUTHENTICATED_USER } from './codespaces-publish-for-authenticated-user.token';
import type { CodespacesPublishForAuthenticatedUserResponse } from './codespaces-publish-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/publish-for-authenticated-user',
  path: '/user/codespaces/{codespace_name}/publish',
  method: 'post',
  tag: 'codespaces',
};

export function provideCodespacesPublishForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesPublishForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_PUBLISH_FOR_AUTHENTICATED_USER,
    'CODESPACES_PUBLISH_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
