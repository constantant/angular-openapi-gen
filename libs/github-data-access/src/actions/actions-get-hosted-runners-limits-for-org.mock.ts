import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_GET_HOSTED_RUNNERS_LIMITS_FOR_ORG } from './actions-get-hosted-runners-limits-for-org.token';
import type { ActionsGetHostedRunnersLimitsForOrgResponse } from './actions-get-hosted-runners-limits-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/get-hosted-runners-limits-for-org',
  path: '/orgs/{org}/actions/hosted-runners/limits',
  method: 'get',
  tag: 'actions',
};

export function provideActionsGetHostedRunnersLimitsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsGetHostedRunnersLimitsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_GET_HOSTED_RUNNERS_LIMITS_FOR_ORG,
    'ACTIONS_GET_HOSTED_RUNNERS_LIMITS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
