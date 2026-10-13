import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposAcceptInvitationForAuthenticatedUser } from './repos-accept-invitation-for-authenticated-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/accept-invitation-for-authenticated-user',
  path: '/user/repository_invitations/{invitation_id}',
  method: 'patch',
  tag: 'repos',
};

export const REPOS_ACCEPT_INVITATION_FOR_AUTHENTICATED_USER_MOCK: MockEndpoint<unknown> =
  {
    key: 'REPOS_ACCEPT_INVITATION_FOR_AUTHENTICATED_USER',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposAcceptInvitationForAuthenticatedUser,
  };

export function provideReposAcceptInvitationForAuthenticatedUserMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_ACCEPT_INVITATION_FOR_AUTHENTICATED_USER_MOCK,
    initialBehavior,
  );
}
