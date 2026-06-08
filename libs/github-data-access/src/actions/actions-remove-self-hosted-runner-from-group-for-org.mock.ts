import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_REMOVE_SELF_HOSTED_RUNNER_FROM_GROUP_FOR_ORG } from './actions-remove-self-hosted-runner-from-group-for-org.token';

export function provideActionsRemoveSelfHostedRunnerFromGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REMOVE_SELF_HOSTED_RUNNER_FROM_GROUP_FOR_ORG,
    'ACTIONS_REMOVE_SELF_HOSTED_RUNNER_FROM_GROUP_FOR_ORG',
    initialBehavior,
  );
}
