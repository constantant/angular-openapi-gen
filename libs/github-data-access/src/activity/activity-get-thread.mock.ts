import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_GET_THREAD } from './activity-get-thread.token';
import type { ActivityGetThreadResponse } from './activity-get-thread.token';

export function provideActivityGetThreadMock(
  initialBehavior?: ProviderInitialBehavior<ActivityGetThreadResponse>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_GET_THREAD,
    'ACTIVITY_GET_THREAD',
    initialBehavior,
  );
}
