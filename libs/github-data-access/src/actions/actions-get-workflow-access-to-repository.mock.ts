import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_WORKFLOW_ACCESS_TO_REPOSITORY } from './actions-get-workflow-access-to-repository.token';
import type { ActionsGetWorkflowAccessToRepositoryResponse } from './actions-get-workflow-access-to-repository.token';

export function provideActionsGetWorkflowAccessToRepositoryMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetWorkflowAccessToRepositoryResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_WORKFLOW_ACCESS_TO_REPOSITORY,
    'ACTIONS_GET_WORKFLOW_ACCESS_TO_REPOSITORY',
    initialBehavior,
  );
}
