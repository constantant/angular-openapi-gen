import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_PUBLISH_FOR_AUTHENTICATED_USER } from './codespaces-publish-for-authenticated-user.token';
import type { CodespacesPublishForAuthenticatedUserResponse } from './codespaces-publish-for-authenticated-user.token';

export function provideCodespacesPublishForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesPublishForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_PUBLISH_FOR_AUTHENTICATED_USER,
    'CODESPACES_PUBLISH_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
