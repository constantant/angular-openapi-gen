import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_LIST_FOR_ISSUE } from './reactions-list-for-issue.token';
import type { ReactionsListForIssueResponse } from './reactions-list-for-issue.token';

export function provideReactionsListForIssueMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsListForIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_LIST_FOR_ISSUE,
    'REACTIONS_LIST_FOR_ISSUE',
    initialBehavior,
  );
}
