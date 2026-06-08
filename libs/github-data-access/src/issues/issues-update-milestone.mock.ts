import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_UPDATE_MILESTONE } from './issues-update-milestone.token';
import type { IssuesUpdateMilestoneResponse } from './issues-update-milestone.token';

export function provideIssuesUpdateMilestoneMock(
  initialBehavior?: ProviderInitialBehavior<IssuesUpdateMilestoneResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_UPDATE_MILESTONE,
    'ISSUES_UPDATE_MILESTONE',
    initialBehavior,
  );
}
