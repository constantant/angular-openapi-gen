import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_STOP_IN_ORGANIZATION } from './codespaces-stop-in-organization.token';
import type { CodespacesStopInOrganizationResponse } from './codespaces-stop-in-organization.token';

export function provideCodespacesStopInOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesStopInOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_STOP_IN_ORGANIZATION,
    'CODESPACES_STOP_IN_ORGANIZATION',
    initialBehavior,
  );
}
