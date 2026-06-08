import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_RE_RUN_WORKFLOW } from './actions-re-run-workflow.token';
import type { ActionsReRunWorkflowResponse } from './actions-re-run-workflow.token';

export function provideActionsReRunWorkflowMock(
  initialBehavior?: ProviderInitialBehavior<ActionsReRunWorkflowResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_RE_RUN_WORKFLOW,
    'ACTIONS_RE_RUN_WORKFLOW',
    initialBehavior,
  );
}
