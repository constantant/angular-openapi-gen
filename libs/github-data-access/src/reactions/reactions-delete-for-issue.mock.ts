import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_DELETE_FOR_ISSUE } from './reactions-delete-for-issue.token';

export function provideReactionsDeleteForIssueMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_DELETE_FOR_ISSUE,
    'REACTIONS_DELETE_FOR_ISSUE',
    initialBehavior,
  );
}
