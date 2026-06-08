import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_MARK_NOTIFICATIONS_AS_READ } from './activity-mark-notifications-as-read.token';
import type { ActivityMarkNotificationsAsReadResponse } from './activity-mark-notifications-as-read.token';

export function provideActivityMarkNotificationsAsReadMock(
  initialBehavior?: ProviderInitialBehavior<ActivityMarkNotificationsAsReadResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_MARK_NOTIFICATIONS_AS_READ,
    'ACTIVITY_MARK_NOTIFICATIONS_AS_READ',
    initialBehavior,
  );
}
