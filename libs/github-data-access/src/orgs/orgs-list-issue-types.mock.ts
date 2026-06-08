import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_ISSUE_TYPES } from './orgs-list-issue-types.token';
import type { OrgsListIssueTypesResponse } from './orgs-list-issue-types.token';

export function provideOrgsListIssueTypesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListIssueTypesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_ISSUE_TYPES,
    'ORGS_LIST_ISSUE_TYPES',
    initialBehavior,
  );
}
