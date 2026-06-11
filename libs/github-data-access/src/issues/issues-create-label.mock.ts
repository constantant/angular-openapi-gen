import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_CREATE_LABEL } from './issues-create-label.token';
import type { IssuesCreateLabelResponse } from './issues-create-label.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/create-label',
  path: '/repos/{owner}/{repo}/labels',
  method: 'post',
  tag: 'issues',
};

export function provideIssuesCreateLabelMock(
  initialBehavior?: ProviderInitialBehavior<IssuesCreateLabelResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_CREATE_LABEL,
    'ISSUES_CREATE_LABEL',
    initialBehavior,
    _meta,
  );
}
