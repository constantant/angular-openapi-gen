import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_UNLOCK } from './issues-unlock.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/unlock',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/lock',
  method: 'delete',
  tag: 'issues',
};

export function provideIssuesUnlockMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_UNLOCK,
    'ISSUES_UNLOCK',
    initialBehavior,
    _meta,
  );
}
