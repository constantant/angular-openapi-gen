import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST } from './issues-list.token';
import type { IssuesListResponse } from './issues-list.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list',
  path: '/issues',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST,
    'ISSUES_LIST',
    initialBehavior,
    _meta,
    options,
  );
}
