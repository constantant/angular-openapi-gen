import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_ORG } from './actions-list-self-hosted-runners-for-org.token';
import type { ActionsListSelfHostedRunnersForOrgResponse } from './actions-list-self-hosted-runners-for-org.token';

export function provideActionsListSelfHostedRunnersForOrgMock(
  initialBehavior?: ProviderInitialBehavior<ActionsListSelfHostedRunnersForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_ORG,
    'ACTIONS_LIST_SELF_HOSTED_RUNNERS_FOR_ORG',
    initialBehavior,
  );
}
