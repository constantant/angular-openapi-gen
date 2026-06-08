import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ISSUE_FIELDS } from './orgs-list-issue-fields.token';
import type { OrgsListIssueFieldsResponse } from './orgs-list-issue-fields.token';

export function provideOrgsListIssueFieldsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListIssueFieldsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ISSUE_FIELDS,
    'ORGS_LIST_ISSUE_FIELDS',
    initialBehavior,
  );
}
