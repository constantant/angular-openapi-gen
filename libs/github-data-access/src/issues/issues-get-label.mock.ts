import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_GET_LABEL } from './issues-get-label.token';
import type { IssuesGetLabelResponse } from './issues-get-label.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/get-label',
  path: '/repos/{owner}/{repo}/labels/{name}',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesGetLabelMock(
  initialBehavior?: ProviderInitialBehavior<IssuesGetLabelResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_GET_LABEL,
    'ISSUES_GET_LABEL',
    initialBehavior,
    _meta,
  );
}
