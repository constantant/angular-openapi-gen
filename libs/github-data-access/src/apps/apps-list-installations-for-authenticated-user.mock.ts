import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_LIST_INSTALLATIONS_FOR_AUTHENTICATED_USER } from './apps-list-installations-for-authenticated-user.token';
import type { AppsListInstallationsForAuthenticatedUserResponse } from './apps-list-installations-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/list-installations-for-authenticated-user',
  path: '/user/installations',
  method: 'get',
  tag: 'apps',
};

export function provideAppsListInstallationsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<AppsListInstallationsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_INSTALLATIONS_FOR_AUTHENTICATED_USER,
    'APPS_LIST_INSTALLATIONS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
