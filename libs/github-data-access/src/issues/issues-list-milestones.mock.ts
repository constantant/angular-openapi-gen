import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_MILESTONES } from './issues-list-milestones.token';
import type { IssuesListMilestonesResponse } from './issues-list-milestones.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-milestones',
  path: '/repos/{owner}/{repo}/milestones',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListMilestonesMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListMilestonesResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_MILESTONES,
    'ISSUES_LIST_MILESTONES',
    initialBehavior,
    _meta,
  );
}
