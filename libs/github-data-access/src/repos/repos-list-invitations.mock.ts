import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_INVITATIONS } from './repos-list-invitations.token';
import type { ReposListInvitationsResponse } from './repos-list-invitations.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-invitations',
  path: '/repos/{owner}/{repo}/invitations',
  method: 'get',
  tag: 'repos',
};

export function provideReposListInvitationsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListInvitationsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_INVITATIONS,
    'REPOS_LIST_INVITATIONS',
    initialBehavior,
    _meta,
  );
}
