import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_SELF_HOSTED_RUNNER_GROUP_FROM_ORG } from './actions-delete-self-hosted-runner-group-from-org.token';

export function provideActionsDeleteSelfHostedRunnerGroupFromOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_SELF_HOSTED_RUNNER_GROUP_FROM_ORG,
    'ACTIONS_DELETE_SELF_HOSTED_RUNNER_GROUP_FROM_ORG',
    initialBehavior,
  );
}
