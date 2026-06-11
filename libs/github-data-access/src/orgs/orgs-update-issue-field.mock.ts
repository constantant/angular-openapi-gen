import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_ISSUE_FIELD } from './orgs-update-issue-field.token';
import type { OrgsUpdateIssueFieldResponse } from './orgs-update-issue-field.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/update-issue-field',
  path: '/orgs/{org}/issue-fields/{issue_field_id}',
  method: 'patch',
  tag: 'orgs',
};

export function provideOrgsUpdateIssueFieldMock(
  initialBehavior?: ProviderInitialBehavior<OrgsUpdateIssueFieldResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_ISSUE_FIELD,
    'ORGS_UPDATE_ISSUE_FIELD',
    initialBehavior,
    _meta,
  );
}
