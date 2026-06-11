import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_REMOVE_ALL_LABELS } from './issues-remove-all-labels.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/remove-all-labels',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/labels',
  method: 'delete',
  tag: 'issues',
};

export function provideIssuesRemoveAllLabelsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REMOVE_ALL_LABELS,
    'ISSUES_REMOVE_ALL_LABELS',
    initialBehavior,
    _meta,
  );
}
