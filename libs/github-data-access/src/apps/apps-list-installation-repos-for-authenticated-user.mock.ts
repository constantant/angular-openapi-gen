import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_LIST_INSTALLATION_REPOS_FOR_AUTHENTICATED_USER } from './apps-list-installation-repos-for-authenticated-user.token';
import type { AppsListInstallationReposForAuthenticatedUserResponse } from './apps-list-installation-repos-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/list-installation-repos-for-authenticated-user',
  path: '/user/installations/{installation_id}/repositories',
  method: 'get',
  tag: 'apps',
};

export function provideAppsListInstallationReposForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<AppsListInstallationReposForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_LIST_INSTALLATION_REPOS_FOR_AUTHENTICATED_USER,
    'APPS_LIST_INSTALLATION_REPOS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
