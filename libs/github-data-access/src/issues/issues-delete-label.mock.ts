import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_DELETE_LABEL } from './issues-delete-label.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/delete-label',
  path: '/repos/{owner}/{repo}/labels/{name}',
  method: 'delete',
  tag: 'issues',
};

export function provideIssuesDeleteLabelMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_DELETE_LABEL,
    'ISSUES_DELETE_LABEL',
    initialBehavior,
    _meta,
  );
}
