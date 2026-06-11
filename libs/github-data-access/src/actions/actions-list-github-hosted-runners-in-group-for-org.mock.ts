import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_GITHUB_HOSTED_RUNNERS_IN_GROUP_FOR_ORG } from './actions-list-github-hosted-runners-in-group-for-org.token';
import type { ActionsListGithubHostedRunnersInGroupForOrgResponse } from './actions-list-github-hosted-runners-in-group-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-github-hosted-runners-in-group-for-org',
  path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/hosted-runners',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListGithubHostedRunnersInGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListGithubHostedRunnersInGroupForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_GITHUB_HOSTED_RUNNERS_IN_GROUP_FOR_ORG,
    'ACTIONS_LIST_GITHUB_HOSTED_RUNNERS_IN_GROUP_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
