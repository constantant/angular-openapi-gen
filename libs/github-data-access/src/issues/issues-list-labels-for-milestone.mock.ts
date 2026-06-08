import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_LABELS_FOR_MILESTONE } from './issues-list-labels-for-milestone.token';
import type { IssuesListLabelsForMilestoneResponse } from './issues-list-labels-for-milestone.token';

export function provideIssuesListLabelsForMilestoneMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListLabelsForMilestoneResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_LABELS_FOR_MILESTONE,
    'ISSUES_LIST_LABELS_FOR_MILESTONE',
    initialBehavior,
  );
}
