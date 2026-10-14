import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposUpdateInvitation,
  type ReposUpdateInvitationResponse,
} from './repos-update-invitation.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-invitation',
  path: '/repos/{owner}/{repo}/invitations/{invitation_id}',
  method: 'patch',
  tag: 'repos',
};

export const REPOS_UPDATE_INVITATION_MOCK: MockEndpoint<ReposUpdateInvitationResponse> =
  {
    key: 'REPOS_UPDATE_INVITATION',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposUpdateInvitation,
  };

export function provideReposUpdateInvitationMock(
  initialBehavior?: MockEndpointBehavior<ReposUpdateInvitationResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_UPDATE_INVITATION_MOCK, initialBehavior);
}
