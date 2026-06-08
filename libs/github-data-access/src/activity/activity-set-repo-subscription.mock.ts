import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_SET_REPO_SUBSCRIPTION } from './activity-set-repo-subscription.token';
import type { ActivitySetRepoSubscriptionResponse } from './activity-set-repo-subscription.token';

export function provideActivitySetRepoSubscriptionMock(
  initialBehavior?: ProviderInitialBehavior<ActivitySetRepoSubscriptionResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_SET_REPO_SUBSCRIPTION,
    'ACTIVITY_SET_REPO_SUBSCRIPTION',
    initialBehavior,
  );
}
