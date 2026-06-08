import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_SELF_HOSTED_RUNNER_GROUP_FOR_ORG } from './actions-get-self-hosted-runner-group-for-org.token';
import type { ActionsGetSelfHostedRunnerGroupForOrgResponse } from './actions-get-self-hosted-runner-group-for-org.token';

export function provideActionsGetSelfHostedRunnerGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetSelfHostedRunnerGroupForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_SELF_HOSTED_RUNNER_GROUP_FOR_ORG,
    'ACTIONS_GET_SELF_HOSTED_RUNNER_GROUP_FOR_ORG',
    initialBehavior,
  );
}
