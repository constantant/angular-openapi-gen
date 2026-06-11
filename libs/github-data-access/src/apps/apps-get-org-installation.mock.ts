import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { APPS_GET_ORG_INSTALLATION } from './apps-get-org-installation.token';
import type { AppsGetOrgInstallationResponse } from './apps-get-org-installation.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'apps/get-org-installation',
  path: '/orgs/{org}/installation',
  method: 'get',
  tag: 'apps',
};

export function provideAppsGetOrgInstallationMock(
  initialBehavior?: ProviderInitialBehavior<AppsGetOrgInstallationResponse>,
): FactoryProvider {
  return provideMockResource(
    APPS_GET_ORG_INSTALLATION,
    'APPS_GET_ORG_INSTALLATION',
    initialBehavior,
    _meta,
  );
}
