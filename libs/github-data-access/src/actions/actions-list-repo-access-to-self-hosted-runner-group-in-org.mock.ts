import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG } from './actions-list-repo-access-to-self-hosted-runner-group-in-org.token';
import type { ActionsListRepoAccessToSelfHostedRunnerGroupInOrgResponse } from './actions-list-repo-access-to-self-hosted-runner-group-in-org.token';

export function provideActionsListRepoAccessToSelfHostedRunnerGroupInOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListRepoAccessToSelfHostedRunnerGroupInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG,
    'ACTIONS_LIST_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG',
    initialBehavior,
  );
}
