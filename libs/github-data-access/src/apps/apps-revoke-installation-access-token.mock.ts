import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_REVOKE_INSTALLATION_ACCESS_TOKEN } from './apps-revoke-installation-access-token.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/revoke-installation-access-token',
  path: '/installation/token',
  method: 'delete',
  tag: 'apps',
};

export function provideAppsRevokeInstallationAccessTokenMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_REVOKE_INSTALLATION_ACCESS_TOKEN,
    'APPS_REVOKE_INSTALLATION_ACCESS_TOKEN',
    initialBehavior,
    _meta,
  );
}
