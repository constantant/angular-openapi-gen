import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_GET_MILESTONE } from './issues-get-milestone.token';
import type { IssuesGetMilestoneResponse } from './issues-get-milestone.token';

export function provideIssuesGetMilestoneMock(
  initialBehavior?: ProviderInitialBehavior<IssuesGetMilestoneResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_GET_MILESTONE,
    'ISSUES_GET_MILESTONE',
    initialBehavior,
  );
}
