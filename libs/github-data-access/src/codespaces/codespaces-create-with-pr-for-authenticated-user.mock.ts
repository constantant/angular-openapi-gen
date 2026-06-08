import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_CREATE_WITH_PR_FOR_AUTHENTICATED_USER } from './codespaces-create-with-pr-for-authenticated-user.token';
import type { CodespacesCreateWithPrForAuthenticatedUserResponse } from './codespaces-create-with-pr-for-authenticated-user.token';

export function provideCodespacesCreateWithPrForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCreateWithPrForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CREATE_WITH_PR_FOR_AUTHENTICATED_USER,
    'CODESPACES_CREATE_WITH_PR_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
