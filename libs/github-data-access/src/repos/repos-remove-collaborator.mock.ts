import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposRemoveCollaborator } from './repos-remove-collaborator.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/remove-collaborator',
  path: '/repos/{owner}/{repo}/collaborators/{username}',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_REMOVE_COLLABORATOR_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_REMOVE_COLLABORATOR',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposRemoveCollaborator,
};

export function provideReposRemoveCollaboratorMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_REMOVE_COLLABORATOR_MOCK, initialBehavior);
}
