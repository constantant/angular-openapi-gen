import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_UPDATE } from './issues-update.token';
import type { IssuesUpdateResponse } from './issues-update.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/update',
  path: '/repos/{owner}/{repo}/issues/{issue_number}',
  method: 'patch',
  tag: 'issues',
};

export function provideIssuesUpdateMock(
  initialBehavior?: ProviderInitialBehavior<IssuesUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_UPDATE,
    'ISSUES_UPDATE',
    initialBehavior,
    _meta,
  );
}
