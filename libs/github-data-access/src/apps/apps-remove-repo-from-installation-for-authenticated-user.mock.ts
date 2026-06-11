import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_REMOVE_REPO_FROM_INSTALLATION_FOR_AUTHENTICATED_USER } from './apps-remove-repo-from-installation-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/remove-repo-from-installation-for-authenticated-user',
  path: '/user/installations/{installation_id}/repositories/{repository_id}',
  method: 'delete',
  tag: 'apps',
};

export function provideAppsRemoveRepoFromInstallationForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_REMOVE_REPO_FROM_INSTALLATION_FOR_AUTHENTICATED_USER,
    'APPS_REMOVE_REPO_FROM_INSTALLATION_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
