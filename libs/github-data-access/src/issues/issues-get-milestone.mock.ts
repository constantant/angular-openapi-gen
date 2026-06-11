import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_GET_MILESTONE } from './issues-get-milestone.token';
import type { IssuesGetMilestoneResponse } from './issues-get-milestone.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/get-milestone',
  path: '/repos/{owner}/{repo}/milestones/{milestone_number}',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesGetMilestoneMock(
  initialBehavior?: ProviderInitialBehavior<IssuesGetMilestoneResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_GET_MILESTONE,
    'ISSUES_GET_MILESTONE',
    initialBehavior,
    _meta,
  );
}
