import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ACTIVITY_MARK_THREAD_AS_DONE } from './activity-mark-thread-as-done.token';

export function provideActivityMarkThreadAsDoneMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ACTIVITY_MARK_THREAD_AS_DONE,
    'ACTIVITY_MARK_THREAD_AS_DONE',
    initialBehavior,
  );
}
