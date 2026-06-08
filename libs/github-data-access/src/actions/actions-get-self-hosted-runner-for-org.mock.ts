import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_SELF_HOSTED_RUNNER_FOR_ORG } from './actions-get-self-hosted-runner-for-org.token';
import type { ActionsGetSelfHostedRunnerForOrgResponse } from './actions-get-self-hosted-runner-for-org.token';

export function provideActionsGetSelfHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetSelfHostedRunnerForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_SELF_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_GET_SELF_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
  );
}
