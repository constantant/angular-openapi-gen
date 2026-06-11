import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_CREATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG } from './actions-create-self-hosted-runner-group-for-org.token';
import type { ActionsCreateSelfHostedRunnerGroupForOrgResponse } from './actions-create-self-hosted-runner-group-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/create-self-hosted-runner-group-for-org',
  path: '/orgs/{org}/actions/runner-groups',
  method: 'post',
  tag: 'actions',
};

export function provideActionsCreateSelfHostedRunnerGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsCreateSelfHostedRunnerGroupForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_CREATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG,
    'ACTIONS_CREATE_SELF_HOSTED_RUNNER_GROUP_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
