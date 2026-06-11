import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_DEPENDENCIES_BLOCKED_BY } from './issues-list-dependencies-blocked-by.token';
import type { IssuesListDependenciesBlockedByResponse } from './issues-list-dependencies-blocked-by.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-dependencies-blocked-by',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListDependenciesBlockedByMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListDependenciesBlockedByResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_DEPENDENCIES_BLOCKED_BY,
    'ISSUES_LIST_DEPENDENCIES_BLOCKED_BY',
    initialBehavior,
    _meta,
  );
}
