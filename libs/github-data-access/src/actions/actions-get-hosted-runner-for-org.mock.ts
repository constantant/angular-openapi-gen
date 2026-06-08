import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_HOSTED_RUNNER_FOR_ORG } from './actions-get-hosted-runner-for-org.token';
import type { ActionsGetHostedRunnerForOrgResponse } from './actions-get-hosted-runner-for-org.token';

export function provideActionsGetHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetHostedRunnerForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_GET_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
  );
}
