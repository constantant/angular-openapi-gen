import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_COLLABORATOR_PERMISSION_LEVEL } from './repos-get-collaborator-permission-level.token';
import type { ReposGetCollaboratorPermissionLevelResponse } from './repos-get-collaborator-permission-level.token';

export function provideReposGetCollaboratorPermissionLevelMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCollaboratorPermissionLevelResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_COLLABORATOR_PERMISSION_LEVEL,
    'REPOS_GET_COLLABORATOR_PERMISSION_LEVEL',
    initialBehavior,
  );
}
