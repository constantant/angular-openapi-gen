import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_UPDATE_REPO_VARIABLE } from './actions-update-repo-variable.token';

export function provideActionsUpdateRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_UPDATE_REPO_VARIABLE,
    'ACTIONS_UPDATE_REPO_VARIABLE',
    initialBehavior,
  );
}
