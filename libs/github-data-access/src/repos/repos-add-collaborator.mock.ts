import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_ADD_COLLABORATOR } from './repos-add-collaborator.token';
import type { ReposAddCollaboratorResponse } from './repos-add-collaborator.token';

export function provideReposAddCollaboratorMock(
  initialBehavior?: ProviderInitialBehavior<ReposAddCollaboratorResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ADD_COLLABORATOR,
    'REPOS_ADD_COLLABORATOR',
    initialBehavior,
  );
}
