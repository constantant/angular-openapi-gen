import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_REPO_VARIABLE } from './actions-delete-repo-variable.token';

export function provideActionsDeleteRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_REPO_VARIABLE,
    'ACTIONS_DELETE_REPO_VARIABLE',
    initialBehavior,
  );
}
