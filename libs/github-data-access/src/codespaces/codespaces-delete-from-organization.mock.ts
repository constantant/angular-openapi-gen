import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_DELETE_FROM_ORGANIZATION } from './codespaces-delete-from-organization.token';
import type { CodespacesDeleteFromOrganizationResponse } from './codespaces-delete-from-organization.token';

export function provideCodespacesDeleteFromOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesDeleteFromOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_DELETE_FROM_ORGANIZATION,
    'CODESPACES_DELETE_FROM_ORGANIZATION',
    initialBehavior,
  );
}
