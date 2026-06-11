import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_GET_INSTALLATION } from './apps-get-installation.token';
import type { AppsGetInstallationResponse } from './apps-get-installation.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/get-installation',
  path: '/app/installations/{installation_id}',
  method: 'get',
  tag: 'apps',
};

export function provideAppsGetInstallationMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetInstallationResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_INSTALLATION,
    'APPS_GET_INSTALLATION',
    initialBehavior,
    _meta,
  );
}
