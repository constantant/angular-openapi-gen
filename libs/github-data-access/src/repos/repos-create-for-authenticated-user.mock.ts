import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_FOR_AUTHENTICATED_USER } from './repos-create-for-authenticated-user.token';
import type { ReposCreateForAuthenticatedUserResponse } from './repos-create-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/create-for-authenticated-user',
  path: '/user/repos',
  method: 'post',
  tag: 'repos',
};

export function provideReposCreateForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_FOR_AUTHENTICATED_USER,
    'REPOS_CREATE_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
