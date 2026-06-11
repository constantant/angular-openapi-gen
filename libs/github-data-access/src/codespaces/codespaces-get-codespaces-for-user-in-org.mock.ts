import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_GET_CODESPACES_FOR_USER_IN_ORG } from './codespaces-get-codespaces-for-user-in-org.token';
import type { CodespacesGetCodespacesForUserInOrgResponse } from './codespaces-get-codespaces-for-user-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/get-codespaces-for-user-in-org',
  path: '/orgs/{org}/members/{username}/codespaces',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesGetCodespacesForUserInOrgMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesGetCodespacesForUserInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_GET_CODESPACES_FOR_USER_IN_ORG,
    'CODESPACES_GET_CODESPACES_FOR_USER_IN_ORG',
    initialBehavior,
    _meta,
  );
}
