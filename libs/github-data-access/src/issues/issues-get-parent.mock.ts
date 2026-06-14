import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_GET_PARENT } from './issues-get-parent.token';
import type { IssuesGetParentResponse } from './issues-get-parent.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/get-parent',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/parent',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesGetParentMock(
  initialBehavior?: ProviderInitialBehavior<IssuesGetParentResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ISSUES_GET_PARENT,
    'ISSUES_GET_PARENT',
    initialBehavior,
    _meta,
    options,
  );
}
