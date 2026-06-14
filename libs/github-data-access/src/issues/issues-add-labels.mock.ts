import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_ADD_LABELS } from './issues-add-labels.token';
import type { IssuesAddLabelsResponse } from './issues-add-labels.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/add-labels',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/labels',
  method: 'post',
  tag: 'issues',
};

export function provideIssuesAddLabelsMock(
  initialBehavior?: ProviderInitialBehavior<IssuesAddLabelsResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ISSUES_ADD_LABELS,
    'ISSUES_ADD_LABELS',
    initialBehavior,
    _meta,
    options,
  );
}
