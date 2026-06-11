import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ISSUES_LIST_FOR_ORG } from './issues-list-for-org.token';
import type { IssuesListForOrgResponse } from './issues-list-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'issues/list-for-org',
  path: '/orgs/{org}/issues',
  method: 'get',
  tag: 'issues',
};

export function provideIssuesListForOrgMock(
  initialBehavior?: ProviderInitialBehavior<IssuesListForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_LIST_FOR_ORG,
    'ISSUES_LIST_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
