import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_REMOVE_COLLABORATOR } from './repos-remove-collaborator.token';

export function provideReposRemoveCollaboratorMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REMOVE_COLLABORATOR,
    'REPOS_REMOVE_COLLABORATOR',
    initialBehavior,
  );
}
