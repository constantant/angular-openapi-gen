import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_LIST_IN_ORGANIZATION } from './codespaces-list-in-organization.token';
import type { CodespacesListInOrganizationResponse } from './codespaces-list-in-organization.token';

export function provideCodespacesListInOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesListInOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_LIST_IN_ORGANIZATION,
    'CODESPACES_LIST_IN_ORGANIZATION',
    initialBehavior,
  );
}
