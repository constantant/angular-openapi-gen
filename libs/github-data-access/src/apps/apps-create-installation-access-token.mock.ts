import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_CREATE_INSTALLATION_ACCESS_TOKEN } from './apps-create-installation-access-token.token';
import type { AppsCreateInstallationAccessTokenResponse } from './apps-create-installation-access-token.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/create-installation-access-token',
  path: '/app/installations/{installation_id}/access_tokens',
  method: 'post',
  tag: 'apps',
};

export function provideAppsCreateInstallationAccessTokenMock(
  initialBehavior?: ProviderInitialBehavior<AppsCreateInstallationAccessTokenResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_CREATE_INSTALLATION_ACCESS_TOKEN,
    'APPS_CREATE_INSTALLATION_ACCESS_TOKEN',
    initialBehavior,
    _meta,
  );
}
