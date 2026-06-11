import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_STOP_IN_ORGANIZATION } from './codespaces-stop-in-organization.token';
import type { CodespacesStopInOrganizationResponse } from './codespaces-stop-in-organization.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/stop-in-organization',
  path: '/orgs/{org}/members/{username}/codespaces/{codespace_name}/stop',
  method: 'post',
  tag: 'codespaces',
};

export function provideCodespacesStopInOrganizationMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesStopInOrganizationResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_STOP_IN_ORGANIZATION,
    'CODESPACES_STOP_IN_ORGANIZATION',
    initialBehavior,
    _meta,
  );
}
