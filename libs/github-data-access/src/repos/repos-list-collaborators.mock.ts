import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_COLLABORATORS } from './repos-list-collaborators.token';
import type { ReposListCollaboratorsResponse } from './repos-list-collaborators.token';

export function provideReposListCollaboratorsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListCollaboratorsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_COLLABORATORS,
    'REPOS_LIST_COLLABORATORS',
    initialBehavior,
  );
}
