import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_ADD_REPO_TO_INSTALLATION_FOR_AUTHENTICATED_USER } from './apps-add-repo-to-installation-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/add-repo-to-installation-for-authenticated-user',
  path: '/user/installations/{installation_id}/repositories/{repository_id}',
  method: 'put',
  tag: 'apps',
};

export function provideAppsAddRepoToInstallationForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    APPS_ADD_REPO_TO_INSTALLATION_FOR_AUTHENTICATED_USER,
    'APPS_ADD_REPO_TO_INSTALLATION_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
