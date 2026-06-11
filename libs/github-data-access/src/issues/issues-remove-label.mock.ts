import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_REMOVE_LABEL } from './issues-remove-label.token';
import type { IssuesRemoveLabelResponse } from './issues-remove-label.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/remove-label',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/labels/{name}',
  method: 'delete',
  tag: 'issues',
};

export function provideIssuesRemoveLabelMock(
  initialBehavior?: ProviderInitialBehavior<IssuesRemoveLabelResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REMOVE_LABEL,
    'ISSUES_REMOVE_LABEL',
    initialBehavior,
    _meta,
  );
}
