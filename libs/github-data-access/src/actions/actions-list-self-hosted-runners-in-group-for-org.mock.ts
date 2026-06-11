import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG } from './actions-list-self-hosted-runners-in-group-for-org.token';
import type { ActionsListSelfHostedRunnersInGroupForOrgResponse } from './actions-list-self-hosted-runners-in-group-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-self-hosted-runners-in-group-for-org',
  path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/runners',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListSelfHostedRunnersInGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelfHostedRunnersInGroupForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG,
    'ACTIONS_LIST_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
