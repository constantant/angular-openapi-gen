import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_ORG } from './actions-delete-self-hosted-runner-from-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/delete-self-hosted-runner-from-org',
  path: '/orgs/{org}/actions/runners/{runner_id}',
  method: 'delete',
  tag: 'actions',
};

export function provideActionsDeleteSelfHostedRunnerFromOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_ORG,
    'ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_ORG',
    initialBehavior,
    _meta,
  );
}
