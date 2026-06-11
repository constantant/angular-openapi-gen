import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_REMOVE_COLLABORATOR } from './repos-remove-collaborator.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/remove-collaborator',
  path: '/repos/{owner}/{repo}/collaborators/{username}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposRemoveCollaboratorMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REMOVE_COLLABORATOR,
    'REPOS_REMOVE_COLLABORATOR',
    initialBehavior,
    _meta,
  );
}
