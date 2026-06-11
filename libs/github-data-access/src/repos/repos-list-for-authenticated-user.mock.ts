import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_FOR_AUTHENTICATED_USER } from './repos-list-for-authenticated-user.token';
import type { ReposListForAuthenticatedUserResponse } from './repos-list-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-for-authenticated-user',
  path: '/user/repos',
  method: 'get',
  tag: 'repos',
};

export function provideReposListForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ReposListForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_FOR_AUTHENTICATED_USER,
    'REPOS_LIST_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
