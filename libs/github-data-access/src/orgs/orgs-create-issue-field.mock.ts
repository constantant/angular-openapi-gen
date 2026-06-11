import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CREATE_ISSUE_FIELD } from './orgs-create-issue-field.token';
import type { OrgsCreateIssueFieldResponse } from './orgs-create-issue-field.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/create-issue-field',
  path: '/orgs/{org}/issue-fields',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsCreateIssueFieldMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCreateIssueFieldResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CREATE_ISSUE_FIELD,
    'ORGS_CREATE_ISSUE_FIELD',
    initialBehavior,
    _meta,
  );
}
