import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CHECK_COLLABORATOR } from './repos-check-collaborator.token';

export function provideReposCheckCollaboratorMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CHECK_COLLABORATOR,
    'REPOS_CHECK_COLLABORATOR',
    initialBehavior,
  );
}
