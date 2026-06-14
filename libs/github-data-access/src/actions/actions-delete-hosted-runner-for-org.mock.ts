import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_HOSTED_RUNNER_FOR_ORG } from './actions-delete-hosted-runner-for-org.token';
import type { ActionsDeleteHostedRunnerForOrgResponse } from './actions-delete-hosted-runner-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-hosted-runner-for-org',
  path: '/orgs/{org}/actions/hosted-runners/{hosted_runner_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteHostedRunnerForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsDeleteHostedRunnerForOrgResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_HOSTED_RUNNER_FOR_ORG,
    'ACTIONS_DELETE_HOSTED_RUNNER_FOR_ORG',
    initialBehavior,
    _meta,
    options,
  );
}
