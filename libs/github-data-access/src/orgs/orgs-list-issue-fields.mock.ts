import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ISSUE_FIELDS } from './orgs-list-issue-fields.token';
import type { OrgsListIssueFieldsResponse } from './orgs-list-issue-fields.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-issue-fields',
  path: '/orgs/{org}/issue-fields',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListIssueFieldsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListIssueFieldsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ISSUE_FIELDS,
    'ORGS_LIST_ISSUE_FIELDS',
    initialBehavior,
    _meta,
  );
}
