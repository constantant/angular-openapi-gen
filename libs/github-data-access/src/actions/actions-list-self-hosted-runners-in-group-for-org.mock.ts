import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG } from './actions-list-self-hosted-runners-in-group-for-org.token';
import type { ActionsListSelfHostedRunnersInGroupForOrgResponse } from './actions-list-self-hosted-runners-in-group-for-org.token';

export function provideActionsListSelfHostedRunnersInGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelfHostedRunnersInGroupForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG,
    'ACTIONS_LIST_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG',
    initialBehavior,
  );
}
