import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_UNSUSPEND_INSTALLATION } from './apps-unsuspend-installation.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/unsuspend-installation',
  path: '/app/installations/{installation_id}/suspended',
  method: 'delete',
  tag: 'apps',
};

export function provideAppsUnsuspendInstallationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    APPS_UNSUSPEND_INSTALLATION,
    'APPS_UNSUSPEND_INSTALLATION',
    initialBehavior,
    _meta,
    options,
  );
}
