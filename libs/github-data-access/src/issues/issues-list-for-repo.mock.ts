import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_FOR_REPO } from './issues-list-for-repo.token';
import type { IssuesListForRepoResponse } from './issues-list-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-for-repo',
  path: '/repos/{owner}/{repo}/issues',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListForRepoMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_FOR_REPO,
    'ISSUES_LIST_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
