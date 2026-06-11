import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_EVENTS_FOR_REPO } from './issues-list-events-for-repo.token';
import type { IssuesListEventsForRepoResponse } from './issues-list-events-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-events-for-repo',
  path: '/repos/{owner}/{repo}/issues/events',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListEventsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListEventsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_EVENTS_FOR_REPO,
    'ISSUES_LIST_EVENTS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
