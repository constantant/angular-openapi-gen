import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_HOSTED_RUNNERS_FOR_ORG } from './actions-list-hosted-runners-for-org.token';
import type { ActionsListHostedRunnersForOrgResponse } from './actions-list-hosted-runners-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-hosted-runners-for-org',
  path: '/orgs/{org}/actions/hosted-runners',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListHostedRunnersForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListHostedRunnersForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_HOSTED_RUNNERS_FOR_ORG,
    'ACTIONS_LIST_HOSTED_RUNNERS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
