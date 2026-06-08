import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIONS_SET_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG } from './actions-set-self-hosted-runners-in-group-for-org.token';

export function provideActionsSetSelfHostedRunnersInGroupForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIONS_SET_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG,
    'ACTIONS_SET_SELF_HOSTED_RUNNERS_IN_GROUP_FOR_ORG',
    initialBehavior,
  );
}
