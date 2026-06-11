import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CHECK_COLLABORATOR } from './repos-check-collaborator.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/check-collaborator',
  path: '/repos/{owner}/{repo}/collaborators/{username}',
  method: 'get',
  tag: 'repos',
};

export function provideReposCheckCollaboratorMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CHECK_COLLABORATOR,
    'REPOS_CHECK_COLLABORATOR',
    initialBehavior,
    _meta,
  );
}
