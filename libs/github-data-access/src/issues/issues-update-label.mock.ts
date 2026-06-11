import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_UPDATE_LABEL } from './issues-update-label.token';
import type { IssuesUpdateLabelResponse } from './issues-update-label.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/update-label',
  path: '/repos/{owner}/{repo}/labels/{name}',
  method: 'patch',
  tag: 'issues',
};

export function provideIssuesUpdateLabelMock(
  initialBehavior?: ProviderInitialBehavior<IssuesUpdateLabelResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_UPDATE_LABEL,
    'ISSUES_UPDATE_LABEL',
    initialBehavior,
    _meta,
  );
}
