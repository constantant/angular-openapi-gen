import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_SUSPEND_INSTALLATION } from './apps-suspend-installation.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/suspend-installation',
  path: '/app/installations/{installation_id}/suspended',
  method: 'put',
  tag: 'apps',
};

export function provideAppsSuspendInstallationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    APPS_SUSPEND_INSTALLATION,
    'APPS_SUSPEND_INSTALLATION',
    initialBehavior,
    _meta,
    options,
  );
}
