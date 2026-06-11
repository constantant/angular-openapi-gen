import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_REMOVE_SELF_HOSTED_RUNNER_FROM_GROUP_FOR_ORG } from './actions-remove-self-hosted-runner-from-group-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/remove-self-hosted-runner-from-group-for-org',
  path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/runners/{runner_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsRemoveSelfHostedRunnerFromGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_REMOVE_SELF_HOSTED_RUNNER_FROM_GROUP_FOR_ORG,
    'ACTIONS_REMOVE_SELF_HOSTED_RUNNER_FROM_GROUP_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
