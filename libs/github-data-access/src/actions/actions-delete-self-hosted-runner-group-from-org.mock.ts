import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_SELF_HOSTED_RUNNER_GROUP_FROM_ORG } from './actions-delete-self-hosted-runner-group-from-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-self-hosted-runner-group-from-org',
  path: '/orgs/{org}/actions/runner-groups/{runner_group_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteSelfHostedRunnerGroupFromOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_SELF_HOSTED_RUNNER_GROUP_FROM_ORG,
    'ACTIONS_DELETE_SELF_HOSTED_RUNNER_GROUP_FROM_ORG',
    initialBehavior,
    _meta,
  );
}
