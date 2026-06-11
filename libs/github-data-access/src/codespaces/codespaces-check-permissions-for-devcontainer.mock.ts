import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_CHECK_PERMISSIONS_FOR_DEVCONTAINER } from './codespaces-check-permissions-for-devcontainer.token';
import type { CodespacesCheckPermissionsForDevcontainerResponse } from './codespaces-check-permissions-for-devcontainer.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/check-permissions-for-devcontainer',
  path: '/repos/{owner}/{repo}/codespaces/permissions_check',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesCheckPermissionsForDevcontainerMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesCheckPermissionsForDevcontainerResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_CHECK_PERMISSIONS_FOR_DEVCONTAINER,
    'CODESPACES_CHECK_PERMISSIONS_FOR_DEVCONTAINER',
    initialBehavior,
    _meta,
  );
}
