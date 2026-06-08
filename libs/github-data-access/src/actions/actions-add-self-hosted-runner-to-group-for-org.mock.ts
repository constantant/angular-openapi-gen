import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_ADD_SELF_HOSTED_RUNNER_TO_GROUP_FOR_ORG } from './actions-add-self-hosted-runner-to-group-for-org.token';

export function provideActionsAddSelfHostedRunnerToGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ADD_SELF_HOSTED_RUNNER_TO_GROUP_FOR_ORG,
    'ACTIONS_ADD_SELF_HOSTED_RUNNER_TO_GROUP_FOR_ORG',
    initialBehavior,
  );
}
