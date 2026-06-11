import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_INVITATIONS_FOR_AUTHENTICATED_USER } from './repos-list-invitations-for-authenticated-user.token';
import type { ReposListInvitationsForAuthenticatedUserResponse } from './repos-list-invitations-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-invitations-for-authenticated-user',
  path: '/user/repository_invitations',
  method: 'get',
  tag: 'repos',
};

export function provideReposListInvitationsForAuthenticatedUserMock(
  initialBehavior?: ProviderInitialBehavior<ReposListInvitationsForAuthenticatedUserResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_INVITATIONS_FOR_AUTHENTICATED_USER,
    'REPOS_LIST_INVITATIONS_FOR_AUTHENTICATED_USER',
    initialBehavior,
    _meta,
  );
}
