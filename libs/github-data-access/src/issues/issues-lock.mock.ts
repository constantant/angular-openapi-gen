import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LOCK } from './issues-lock.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/lock',
  path: '/repos/{owner}/{repo}/issues/{issue_number}/lock',
  method: 'put',
  tag: 'issues',
};

export function provideIssuesLockMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LOCK,
    'ISSUES_LOCK',
    initialBehavior,
    _meta,
  );
}
