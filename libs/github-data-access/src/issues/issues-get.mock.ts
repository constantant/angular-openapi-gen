import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_GET } from './issues-get.token';
import type { IssuesGetResponse } from './issues-get.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/get',
  path: '/repos/{owner}/{repo}/issues/{issue_number}',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesGetMock(
  initialBehavior?: ProviderInitialBehavior<IssuesGetResponse>,
): FactoryProvider {
  return provideMockResource(ISSUES_GET, 'ISSUES_GET', initialBehavior, _meta);
}
