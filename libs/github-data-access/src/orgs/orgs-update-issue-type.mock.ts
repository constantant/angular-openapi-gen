import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_ISSUE_TYPE } from './orgs-update-issue-type.token';
import type { OrgsUpdateIssueTypeResponse } from './orgs-update-issue-type.token';

export function provideOrgsUpdateIssueTypeMock(
  initialBehavior?: ProviderInitialBehavior<OrgsUpdateIssueTypeResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_ISSUE_TYPE,
    'ORGS_UPDATE_ISSUE_TYPE',
    initialBehavior,
  );
}
