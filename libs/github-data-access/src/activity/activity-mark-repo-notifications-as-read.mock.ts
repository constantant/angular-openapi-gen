import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ACTIVITY_MARK_REPO_NOTIFICATIONS_AS_READ } from './activity-mark-repo-notifications-as-read.token';
import type { ActivityMarkRepoNotificationsAsReadResponse } from './activity-mark-repo-notifications-as-read.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'activity/mark-repo-notifications-as-read',
  path: '/repos/{owner}/{repo}/notifications',
  method: 'put',
  tag: 'activity',
};

export function provideActivityMarkRepoNotificationsAsReadMock(
  initialBehavior?: ProviderInitialBehavior<ActivityMarkRepoNotificationsAsReadResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_MARK_REPO_NOTIFICATIONS_AS_READ,
    'ACTIVITY_MARK_REPO_NOTIFICATIONS_AS_READ',
    initialBehavior,
    _meta,
  );
}
