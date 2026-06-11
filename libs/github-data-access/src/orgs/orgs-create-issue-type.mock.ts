import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CREATE_ISSUE_TYPE } from './orgs-create-issue-type.token';
import type { OrgsCreateIssueTypeResponse } from './orgs-create-issue-type.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/create-issue-type',
  path: '/orgs/{org}/issue-types',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsCreateIssueTypeMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCreateIssueTypeResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CREATE_ISSUE_TYPE,
    'ORGS_CREATE_ISSUE_TYPE',
    initialBehavior,
    _meta,
  );
}
