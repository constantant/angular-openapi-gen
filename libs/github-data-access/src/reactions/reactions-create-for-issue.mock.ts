import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REACTIONS_CREATE_FOR_ISSUE } from './reactions-create-for-issue.token';
import type { ReactionsCreateForIssueResponse } from './reactions-create-for-issue.token';

export function provideReactionsCreateForIssueMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsCreateForIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_CREATE_FOR_ISSUE,
    'REACTIONS_CREATE_FOR_ISSUE',
    initialBehavior,
  );
}
