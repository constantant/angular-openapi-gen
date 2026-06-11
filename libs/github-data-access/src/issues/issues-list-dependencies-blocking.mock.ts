import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_DEPENDENCIES_BLOCKING } from './issues-list-dependencies-blocking.token';
import type { IssuesListDependenciesBlockingResponse } from './issues-list-dependencies-blocking.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-dependencies-blocking',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocking',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListDependenciesBlockingMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListDependenciesBlockingResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_DEPENDENCIES_BLOCKING,
    'ISSUES_LIST_DEPENDENCIES_BLOCKING',
    initialBehavior,
    _meta,
  );
}
