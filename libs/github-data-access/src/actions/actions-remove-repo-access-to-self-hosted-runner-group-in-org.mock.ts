import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_REMOVE_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG } from './actions-remove-repo-access-to-self-hosted-runner-group-in-org.token';

export function provideActionsRemoveRepoAccessToSelfHostedRunnerGroupInOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REMOVE_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG,
    'ACTIONS_REMOVE_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG',
    initialBehavior,
  );
}
