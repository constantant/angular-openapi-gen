import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_GET_AUTHENTICATED } from './apps-get-authenticated.token';
import type { AppsGetAuthenticatedResponse } from './apps-get-authenticated.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/get-authenticated',
  path: '/app',
  method: 'get',
  tag: 'apps',
};

export function provideAppsGetAuthenticatedMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetAuthenticatedResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_AUTHENTICATED,
    'APPS_GET_AUTHENTICATED',
    initialBehavior,
    _meta,
  );
}
