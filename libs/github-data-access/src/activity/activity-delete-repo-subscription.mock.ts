import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_DELETE_REPO_SUBSCRIPTION } from './activity-delete-repo-subscription.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/delete-repo-subscription',
  path: '/repos/{owner}/{repo}/subscription',
  method: 'delete',
  tag: 'activity',
};

export function provideActivityDeleteRepoSubscriptionMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_DELETE_REPO_SUBSCRIPTION,
    'ACTIVITY_DELETE_REPO_SUBSCRIPTION',
    initialBehavior,
    _meta,
  );
}
