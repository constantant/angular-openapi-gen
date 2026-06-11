import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_ADD_SELF_HOSTED_RUNNER_TO_GROUP_FOR_ORG } from './actions-add-self-hosted-runner-to-group-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/add-self-hosted-runner-to-group-for-org',
  path: '/orgs/{org}/actions/runner-groups/{runner_group_id}/runners/{runner_id}',
  method: 'put',
  tag: 'actions',
};

export function provideActionsAddSelfHostedRunnerToGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_ADD_SELF_HOSTED_RUNNER_TO_GROUP_FOR_ORG,
    'ACTIONS_ADD_SELF_HOSTED_RUNNER_TO_GROUP_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
