import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_EXPORT_FOR_AUTHENTICATED_USER } from './codespaces-export-for-authenticated-user.token';
import type { CodespacesExportForAuthenticatedUserResponse } from './codespaces-export-for-authenticated-user.token';

export function provideCodespacesExportForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesExportForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_EXPORT_FOR_AUTHENTICATED_USER,
    'CODESPACES_EXPORT_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
