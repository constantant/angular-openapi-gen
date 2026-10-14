import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetCollaboratorPermissionLevel,
  type ReposGetCollaboratorPermissionLevelResponse,
} from './repos-get-collaborator-permission-level.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-collaborator-permission-level',
  path: '/repos/{owner}/{repo}/collaborators/{username}/permission',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_COLLABORATOR_PERMISSION_LEVEL_MOCK: MockEndpoint<ReposGetCollaboratorPermissionLevelResponse> =
  {
    key: 'REPOS_GET_COLLABORATOR_PERMISSION_LEVEL',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetCollaboratorPermissionLevel,
  };

export function provideReposGetCollaboratorPermissionLevelMock(
  initialBehavior?: MockEndpointBehavior<ReposGetCollaboratorPermissionLevelResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_COLLABORATOR_PERMISSION_LEVEL_MOCK,
    initialBehavior,
  );
}
