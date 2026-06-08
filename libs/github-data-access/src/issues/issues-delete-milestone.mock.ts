import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_DELETE_MILESTONE } from './issues-delete-milestone.token';

export function provideIssuesDeleteMilestoneMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_DELETE_MILESTONE,
    'ISSUES_DELETE_MILESTONE',
    initialBehavior,
  );
}
