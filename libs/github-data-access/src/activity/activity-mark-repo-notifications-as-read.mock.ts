import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_MARK_REPO_NOTIFICATIONS_AS_READ } from './activity-mark-repo-notifications-as-read.token';
import type { ActivityMarkRepoNotificationsAsReadResponse } from './activity-mark-repo-notifications-as-read.token';

export function provideActivityMarkRepoNotificationsAsReadMock(
  initialBehavior?: ProviderInitialBehavior<ActivityMarkRepoNotificationsAsReadResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_MARK_REPO_NOTIFICATIONS_AS_READ,
    'ACTIVITY_MARK_REPO_NOTIFICATIONS_AS_READ',
    initialBehavior,
  );
}
