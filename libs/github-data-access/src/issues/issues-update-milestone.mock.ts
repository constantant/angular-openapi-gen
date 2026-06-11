import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_UPDATE_MILESTONE } from './issues-update-milestone.token';
import type { IssuesUpdateMilestoneResponse } from './issues-update-milestone.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/update-milestone',
  path: '/repos/{owner}/{repo}/milestones/{milestone_number}',
  method: 'patch',
  tag: 'issues',
};

export function provideIssuesUpdateMilestoneMock(
  initialBehavior?: ProviderInitialBehavior<IssuesUpdateMilestoneResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_UPDATE_MILESTONE,
    'ISSUES_UPDATE_MILESTONE',
    initialBehavior,
    _meta,
  );
}
