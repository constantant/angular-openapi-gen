import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_DELETE_INSTALLATION } from './apps-delete-installation.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/delete-installation',
  path: '/app/installations/{installation_id}',
  method: 'delete',
  tag: 'apps',
};

export function provideAppsDeleteInstallationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    APPS_DELETE_INSTALLATION,
    'APPS_DELETE_INSTALLATION',
    initialBehavior,
    _meta,
    options,
  );
}
