import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_GET_REPO_SUBSCRIPTION } from './activity-get-repo-subscription.token';
import type { ActivityGetRepoSubscriptionResponse } from './activity-get-repo-subscription.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/get-repo-subscription',
  path: '/repos/{owner}/{repo}/subscription',
  method: 'get',
  tag: 'activity',
};

export function provideActivityGetRepoSubscriptionMock(
  initialBehavior?: ProviderInitialBehavior<ActivityGetRepoSubscriptionResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_GET_REPO_SUBSCRIPTION,
    'ACTIVITY_GET_REPO_SUBSCRIPTION',
    initialBehavior,
    _meta,
  );
}
