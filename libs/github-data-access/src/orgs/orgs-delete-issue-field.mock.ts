import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE_ISSUE_FIELD } from './orgs-delete-issue-field.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/delete-issue-field',
  path: '/orgs/{org}/issue-fields/{issue_field_id}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsDeleteIssueFieldMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE_ISSUE_FIELD,
    'ORGS_DELETE_ISSUE_FIELD',
    initialBehavior,
    _meta,
  );
}
