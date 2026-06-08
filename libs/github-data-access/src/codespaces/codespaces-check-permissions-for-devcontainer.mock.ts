import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODESPACES_CHECK_PERMISSIONS_FOR_DEVCONTAINER } from './codespaces-check-permissions-for-devcontainer.token';
import type { CodespacesCheckPermissionsForDevcontainerResponse } from './codespaces-check-permissions-for-devcontainer.token';

export function provideCodespacesCheckPermissionsForDevcontainerMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCheckPermissionsForDevcontainerResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CHECK_PERMISSIONS_FOR_DEVCONTAINER,
    'CODESPACES_CHECK_PERMISSIONS_FOR_DEVCONTAINER',
    initialBehavior,
  );
}
