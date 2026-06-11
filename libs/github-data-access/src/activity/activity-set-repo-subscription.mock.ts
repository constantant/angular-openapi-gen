import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_SET_REPO_SUBSCRIPTION } from './activity-set-repo-subscription.token';
import type { ActivitySetRepoSubscriptionResponse } from './activity-set-repo-subscription.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/set-repo-subscription',
  path: '/repos/{owner}/{repo}/subscription',
  method: 'put',
  tag: 'activity',
};

export function provideActivitySetRepoSubscriptionMock(
  initialBehavior?: ProviderInitialBehavior<ActivitySetRepoSubscriptionResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_SET_REPO_SUBSCRIPTION,
    'ACTIVITY_SET_REPO_SUBSCRIPTION',
    initialBehavior,
    _meta,
  );
}
