import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_FOR_USER } from './repos-list-for-user.token';
import type { ReposListForUserResponse } from './repos-list-for-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-for-user',
  path: '/users/{username}/repos',
  method: 'get',
  tag: 'repos',
};

export function provideReposListForUserMock(
  initialBehavior?: ProviderInitialBehavior<ReposListForUserResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_FOR_USER,
    'REPOS_LIST_FOR_USER',
    initialBehavior,
    _meta,
  );
}
