import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CODESPACES_PRE_FLIGHT_WITH_REPO_FOR_AUTHENTICATED_USER } from './codespaces-pre-flight-with-repo-for-authenticated-user.token';
import type { CodespacesPreFlightWithRepoForAuthenticatedUserResponse } from './codespaces-pre-flight-with-repo-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'codespaces/pre-flight-with-repo-for-authenticated-user',
  path: '/repos/{owner}/{repo}/codespaces/new',
  method: 'get',
  tag: 'codespaces',
};

export function provideCodespacesPreFlightWithRepoForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<CodespacesPreFlightWithRepoForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    CODESPACES_PRE_FLIGHT_WITH_REPO_FOR_AUTHENTICATED_USER,
    'CODESPACES_PRE_FLIGHT_WITH_REPO_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
