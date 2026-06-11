import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_LIST_FOR_ISSUE } from './reactions-list-for-issue.token';
import type { ReactionsListForIssueResponse } from './reactions-list-for-issue.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/list-for-issue',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/reactions',
  method: 'get',
  tag: 'reactions',
};

export function provideReactionsListForIssueMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsListForIssueResponse>,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_LIST_FOR_ISSUE,
    'REACTIONS_LIST_FOR_ISSUE',
    initialBehavior,
    _meta,
  );
}
