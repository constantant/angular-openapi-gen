import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_DELETE_AUTHORIZATION } from './apps-delete-authorization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/delete-authorization',
  path: '/applications/{client_id}/grant',
  method: 'delete',
  tag: 'apps',
};

export function provideAppsDeleteAuthorizationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_DELETE_AUTHORIZATION,
    'APPS_DELETE_AUTHORIZATION',
    initialBehavior,
    _meta,
  );
}
