import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDeleteInvitation } from './repos-delete-invitation.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-invitation',
  path: '/repos/{owner}/{repo}/invitations/{invitation_id}',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DELETE_INVITATION_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_DELETE_INVITATION',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposDeleteInvitation,
};

export function provideReposDeleteInvitationMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_DELETE_INVITATION_MOCK, initialBehavior);
}
