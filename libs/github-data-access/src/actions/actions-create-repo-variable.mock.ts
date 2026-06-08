import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_REPO_VARIABLE } from './actions-create-repo-variable.token';
import type { ActionsCreateRepoVariableResponse } from './actions-create-repo-variable.token';

export function provideActionsCreateRepoVariableMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateRepoVariableResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_REPO_VARIABLE,
    'ACTIONS_CREATE_REPO_VARIABLE',
    initialBehavior,
  );
}
