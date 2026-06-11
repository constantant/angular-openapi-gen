import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_SET_LABELS } from './issues-set-labels.token';
import type { IssuesSetLabelsResponse } from './issues-set-labels.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/set-labels',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/labels',
  method: 'put',
  tag: 'issues',
};

export function provideIssuesSetLabelsMock(
  initialBehavior?: ProviderInitialBehavior<IssuesSetLabelsResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_SET_LABELS,
    'ISSUES_SET_LABELS',
    initialBehavior,
    _meta,
  );
}
