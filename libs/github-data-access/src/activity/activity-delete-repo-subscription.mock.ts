import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_DELETE_REPO_SUBSCRIPTION } from './activity-delete-repo-subscription.token';

export function provideActivityDeleteRepoSubscriptionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_DELETE_REPO_SUBSCRIPTION,
    'ACTIVITY_DELETE_REPO_SUBSCRIPTION',
    initialBehavior,
  );
}
