import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_LABELS_FOR_REPO } from './issues-list-labels-for-repo.token';
import type { IssuesListLabelsForRepoResponse } from './issues-list-labels-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-labels-for-repo',
  path: '/repos/{owner}/{repo}/labels',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListLabelsForRepoMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListLabelsForRepoResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_LABELS_FOR_REPO,
    'ISSUES_LIST_LABELS_FOR_REPO',
    initialBehavior,
    _meta,
  );
}
