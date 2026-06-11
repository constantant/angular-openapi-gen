import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_ORG } from './actions-list-self-hosted-runners-for-org.token';
import type { ActionsListSelfHostedRunnersForOrgResponse } from './actions-list-self-hosted-runners-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'actions/list-self-hosted-runners-for-org',
  path: '/orgs/{org}/actions/runners',
  method: 'get',
  tag: 'actions',
};

export function provideActionsListSelfHostedRunnersForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelfHostedRunnersForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_ORG,
    'ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
