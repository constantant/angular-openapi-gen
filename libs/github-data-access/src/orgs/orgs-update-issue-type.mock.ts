import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_ISSUE_TYPE } from './orgs-update-issue-type.token';
import type { OrgsUpdateIssueTypeResponse } from './orgs-update-issue-type.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/update-issue-type',
  path: '/orgs/{org}/issue-types/{issue_type_id}',
  method: 'put',
  tag: 'orgs',
};

export function provideOrgsUpdateIssueTypeMock(
  initialBehavior?: ProviderInitialBehavior<OrgsUpdateIssueTypeResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_ISSUE_TYPE,
    'ORGS_UPDATE_ISSUE_TYPE',
    initialBehavior,
    _meta,
  );
}
