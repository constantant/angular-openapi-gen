import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_MILESTONES } from './issues-list-milestones.token';
import type { IssuesListMilestonesResponse } from './issues-list-milestones.token';

export function provideIssuesListMilestonesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListMilestonesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_MILESTONES,
    'ISSUES_LIST_MILESTONES',
    initialBehavior,
  );
}
