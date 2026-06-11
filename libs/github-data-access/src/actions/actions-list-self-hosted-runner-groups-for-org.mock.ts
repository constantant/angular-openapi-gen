import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELF_HOSTED_RUNNER_GROUPS_FOR_ORG } from './actions-list-self-hosted-runner-groups-for-org.token';
import type { ActionsListSelfHostedRunnerGroupsForOrgResponse } from './actions-list-self-hosted-runner-groups-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-self-hosted-runner-groups-for-org',
  path: '/orgs/{org}/actions/runner-groups',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListSelfHostedRunnerGroupsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelfHostedRunnerGroupsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELF_HOSTED_RUNNER_GROUPS_FOR_ORG,
    'ACTIONS_LIST_SELF_HOSTED_RUNNER_GROUPS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
