import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_ADD_BLOCKED_BY_DEPENDENCY } from './issues-add-blocked-by-dependency.token';
import type { IssuesAddBlockedByDependencyResponse } from './issues-add-blocked-by-dependency.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/add-blocked-by-dependency',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by',
  method: 'post',
  tag: 'issues',
};

export function provideIssuesAddBlockedByDependencyMock(
  initialBehavior?: ProviderInitialBehavior<IssuesAddBlockedByDependencyResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_ADD_BLOCKED_BY_DEPENDENCY,
    'ISSUES_ADD_BLOCKED_BY_DEPENDENCY',
    initialBehavior,
    _meta,
  );
}
