import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_REMOVE_DEPENDENCY_BLOCKED_BY } from './issues-remove-dependency-blocked-by.token';
import type { IssuesRemoveDependencyBlockedByResponse } from './issues-remove-dependency-blocked-by.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/remove-dependency-blocked-by',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by/{issue_id}',
  method: 'delete',
  tag: 'issues',
};

export function provideIssuesRemoveDependencyBlockedByMock(
  initialBehavior?: ProviderInitialBehavior<IssuesRemoveDependencyBlockedByResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REMOVE_DEPENDENCY_BLOCKED_BY,
    'ISSUES_REMOVE_DEPENDENCY_BLOCKED_BY',
    initialBehavior,
    _meta,
  );
}
