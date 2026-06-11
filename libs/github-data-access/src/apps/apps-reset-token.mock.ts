import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_RESET_TOKEN } from './apps-reset-token.token';
import type { AppsResetTokenResponse } from './apps-reset-token.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/reset-token',
  path: '/applications/{client_id}/token',
  method: 'patch',
  tag: 'apps',
};

export function provideAppsResetTokenMock(
  initialBehavior?: ProviderInitialBehavior<AppsResetTokenResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_RESET_TOKEN,
    'APPS_RESET_TOKEN',
    initialBehavior,
    _meta,
  );
}
