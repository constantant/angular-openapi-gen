import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_DELETE_TOKEN } from './apps-delete-token.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/delete-token',
  path: '/applications/{client_id}/token',
  method: 'delete',
  tag: 'apps',
};

export function provideAppsDeleteTokenMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_DELETE_TOKEN,
    'APPS_DELETE_TOKEN',
    initialBehavior,
    _meta,
  );
}
