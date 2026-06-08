import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_GET_CODESPACES_FOR_USER_IN_ORG } from './codespaces-get-codespaces-for-user-in-org.token';
import type { CodespacesGetCodespacesForUserInOrgResponse } from './codespaces-get-codespaces-for-user-in-org.token';

export function provideCodespacesGetCodespacesForUserInOrgMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesGetCodespacesForUserInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_GET_CODESPACES_FOR_USER_IN_ORG,
    'CODESPACES_GET_CODESPACES_FOR_USER_IN_ORG',
    initialBehavior,
  );
}
