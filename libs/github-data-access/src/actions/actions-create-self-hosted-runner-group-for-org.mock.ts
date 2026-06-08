import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG } from './actions-create-self-hosted-runner-group-for-org.token';
import type { ActionsCreateSelfHostedRunnerGroupForOrgResponse } from './actions-create-self-hosted-runner-group-for-org.token';

export function provideActionsCreateSelfHostedRunnerGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateSelfHostedRunnerGroupForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG,
    'ACTIONS_CREATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG',
    initialBehavior,
  );
}
