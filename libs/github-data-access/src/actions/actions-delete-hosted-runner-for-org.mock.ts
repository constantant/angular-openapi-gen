import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_HOSTED_RUNNER_FOR_ORG } from './actions-delete-hosted-runner-for-org.token';
import type { ActionsDeleteHostedRunnerForOrgResponse } from './actions-delete-hosted-runner-for-org.token';

export function provideActionsDeleteHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsDeleteHostedRunnerForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_DELETE_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
  );
}
