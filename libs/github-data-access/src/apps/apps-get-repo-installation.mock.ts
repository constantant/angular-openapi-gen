import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_GET_REPO_INSTALLATION } from './apps-get-repo-installation.token';
import type { AppsGetRepoInstallationResponse } from './apps-get-repo-installation.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/get-repo-installation',
  path: '/repos/{owner}/{repo}/installation',
  method: 'get',
  tag: 'apps',
};

export function provideAppsGetRepoInstallationMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetRepoInstallationResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_REPO_INSTALLATION,
    'APPS_GET_REPO_INSTALLATION',
    initialBehavior,
    _meta,
  );
}
