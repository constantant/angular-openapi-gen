import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_LABELS_FOR_MILESTONE } from './issues-list-labels-for-milestone.token';
import type { IssuesListLabelsForMilestoneResponse } from './issues-list-labels-for-milestone.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-labels-for-milestone',
  path: '/repos/{owner}/{repo}/milestones/{milestone_number}/labels',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListLabelsForMilestoneMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListLabelsForMilestoneResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_LABELS_FOR_MILESTONE,
    'ISSUES_LIST_LABELS_FOR_MILESTONE',
    initialBehavior,
    _meta,
  );
}
