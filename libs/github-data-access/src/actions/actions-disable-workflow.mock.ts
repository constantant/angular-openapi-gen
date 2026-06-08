import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DISABLE_WORKFLOW } from './actions-disable-workflow.token';

export function provideActionsDisableWorkflowMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DISABLE_WORKFLOW,
    'ACTIONS_DISABLE_WORKFLOW',
    initialBehavior,
  );
}
