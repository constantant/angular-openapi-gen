import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_WORKFLOW_ACCESS_TO_REPOSITORY } from './actions-set-workflow-access-to-repository.token';

export function provideActionsSetWorkflowAccessToRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_WORKFLOW_ACCESS_TO_REPOSITORY,
    'ACTIONS_SET_WORKFLOW_ACCESS_TO_REPOSITORY',
    initialBehavior,
  );
}
