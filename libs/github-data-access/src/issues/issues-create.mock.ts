import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_CREATE } from './issues-create.token';
import type { IssuesCreateResponse } from './issues-create.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/create',
  path: '/repos/{owner}/{repo}/issues',
  method: 'post',
  tag: 'issues',
};

export function provideIssuesCreateMock(
  initialBehavior?: ProviderInitialBehavior<IssuesCreateResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_CREATE,
    'ISSUES_CREATE',
    initialBehavior,
    _meta,
  );
}
