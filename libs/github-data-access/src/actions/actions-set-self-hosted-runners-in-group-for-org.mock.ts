import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG } from './actions-set-self-hosted-runners-in-group-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/set-self-hosted-runners-in-group-for-org',
  path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/runners',
  method: 'put',
  tag: 'actions',
};

export function provideActionsSetSelfHostedRunnersInGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG,
    'ACTIONS_SET_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
