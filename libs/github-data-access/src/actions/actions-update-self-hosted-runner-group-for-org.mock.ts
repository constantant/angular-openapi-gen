import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_UPDATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG } from './actions-update-self-hosted-runner-group-for-org.token';
import type { ActionsUpdateSelfHostedRunnerGroupForOrgResponse } from './actions-update-self-hosted-runner-group-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/update-self-hosted-runner-group-for-org',
  path: '/orgs/{org}/actions/runner-groups/{runner_group_id}',
  method: 'patch',
  tag: 'actions',
};

export function provideActionsUpdateSelfHostedRunnerGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsUpdateSelfHostedRunnerGroupForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_UPDATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG,
    'ACTIONS_UPDATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
