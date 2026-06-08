import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_DISPATCH_EVENT } from './repos-create-dispatch-event.token';

export function provideReposCreateDispatchEventMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_DISPATCH_EVENT,
    'REPOS_CREATE_DISPATCH_EVENT',
    initialBehavior,
  );
}
