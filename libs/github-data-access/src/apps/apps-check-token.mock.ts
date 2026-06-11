import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_CHECK_TOKEN } from './apps-check-token.token';
import type { AppsCheckTokenResponse } from './apps-check-token.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/check-token',
  path: '/applications/{client_id}/token',
  method: 'post',
  tag: 'apps',
};

export function provideAppsCheckTokenMock(
  initialBehavior?: ProviderInitialBehavior<AppsCheckTokenResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_CHECK_TOKEN,
    'APPS_CHECK_TOKEN',
    initialBehavior,
    _meta,
  );
}
