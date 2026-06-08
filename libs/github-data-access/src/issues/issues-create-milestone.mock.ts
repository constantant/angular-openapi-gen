import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_CREATE_MILESTONE } from './issues-create-milestone.token';
import type { IssuesCreateMilestoneResponse } from './issues-create-milestone.token';

export function provideIssuesCreateMilestoneMock(
  initialBehavior?: ProviderInitialBehavior<IssuesCreateMilestoneResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_CREATE_MILESTONE,
    'ISSUES_CREATE_MILESTONE',
    initialBehavior,
  );
}
