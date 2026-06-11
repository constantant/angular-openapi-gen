import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_DELETE_MILESTONE } from './issues-delete-milestone.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/delete-milestone',
  path: '/repos/{owner}/{repo}/milestones/{milestone_number}',
  method: 'delete',
  tag: 'issues',
};

export function provideIssuesDeleteMilestoneMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_DELETE_MILESTONE,
    'ISSUES_DELETE_MILESTONE',
    initialBehavior,
    _meta,
  );
}
