import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REACTIONS_CREATE_FOR_ISSUE } from './reactions-create-for-issue.token';
import type { ReactionsCreateForIssueResponse } from './reactions-create-for-issue.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'reactions/create-for-issue',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/reactions',
  method: 'post',
  tag: 'reactions',
};

export function provideReactionsCreateForIssueMock(
  initialBehavior?: ProviderInitialBehavior<ReactionsCreateForIssueResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    REACTIONS_CREATE_FOR_ISSUE,
    'REACTIONS_CREATE_FOR_ISSUE',
    initialBehavior,
    _meta,
    options,
  );
}
