import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_GET_REPO_SUBSCRIPTION } from './activity-get-repo-subscription.token';
import type { ActivityGetRepoSubscriptionResponse } from './activity-get-repo-subscription.token';

export function provideActivityGetRepoSubscriptionMock(
  initialBehavior?: ProviderInitialBehavior<ActivityGetRepoSubscriptionResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_GET_REPO_SUBSCRIPTION,
    'ACTIVITY_GET_REPO_SUBSCRIPTION',
    initialBehavior,
  );
}
