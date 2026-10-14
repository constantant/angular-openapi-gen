import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposAddCollaborator,
  type ReposAddCollaboratorResponse,
} from './repos-add-collaborator.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/add-collaborator',
  path: '/repos/{owner}/{repo}/collaborators/{username}',
  method: 'put',
  tag: 'repos',
};

export const REPOS_ADD_COLLABORATOR_MOCK: MockEndpoint<ReposAddCollaboratorResponse> =
  {
    key: 'REPOS_ADD_COLLABORATOR',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposAddCollaborator,
  };

export function provideReposAddCollaboratorMock(
  initialBehavior?: MockEndpointBehavior<ReposAddCollaboratorResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_ADD_COLLABORATOR_MOCK, initialBehavior);
}
