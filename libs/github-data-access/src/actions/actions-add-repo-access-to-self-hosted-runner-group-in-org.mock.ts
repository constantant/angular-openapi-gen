import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_ADD_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG } from './actions-add-repo-access-to-self-hosted-runner-group-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/add-repo-access-to-self-hosted-runner-group-in-org',
  path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories/{repository_id}',
  method: 'put',
  tag: 'actions',
};

export function provideActionsAddRepoAccessToSelfHostedRunnerGroupInOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ADD_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG,
    'ACTIONS_ADD_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG',
    initialBehavior,
    _meta,
  );
}
