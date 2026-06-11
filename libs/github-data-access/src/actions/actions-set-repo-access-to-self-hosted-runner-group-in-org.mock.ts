import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG } from './actions-set-repo-access-to-self-hosted-runner-group-in-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-repo-access-to-self-hosted-runner-group-in-org',
  path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/repositories',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetRepoAccessToSelfHostedRunnerGroupInOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG,
    'ACTIONS_SET_REPO_ACCESS_TO_SELF_HOSTED_RUNNER_GROUP_IN_ORG',
    initialBehavior,
    _meta,
  );
}
