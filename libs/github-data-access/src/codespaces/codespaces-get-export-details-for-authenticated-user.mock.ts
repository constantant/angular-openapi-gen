import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_GET_EXPORT_DETAILS_FOR_AUTHENTICATED_USER } from './codespaces-get-export-details-for-authenticated-user.token';
import type { CodespacesGetExportDetailsForAuthenticatedUserResponse } from './codespaces-get-export-details-for-authenticated-user.token';

export function provideCodespacesGetExportDetailsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesGetExportDetailsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_GET_EXPORT_DETAILS_FOR_AUTHENTICATED_USER,
    'CODESPACES_GET_EXPORT_DETAILS_FOR_AUTHENTICATED_USER',
    initialBehavior,
  );
}
