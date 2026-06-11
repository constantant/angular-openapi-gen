import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_ADD_COLLABORATOR } from './repos-add-collaborator.token';
import type { ReposAddCollaboratorResponse } from './repos-add-collaborator.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/add-collaborator',
  path: '/repos/{owner}/{repo}/collaborators/{username}',
  method: 'put',
  tag: 'repos',
};

export function provideReposAddCollaboratorMock(
  initialBehavior?: ProviderInitialBehavior<ReposAddCollaboratorResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ADD_COLLABORATOR,
    'REPOS_ADD_COLLABORATOR',
    initialBehavior,
    _meta,
  );
}
