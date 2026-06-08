import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_ISSUE_FIELD } from './orgs-update-issue-field.token';
import type { OrgsUpdateIssueFieldResponse } from './orgs-update-issue-field.token';

export function provideOrgsUpdateIssueFieldMock(
  initialBehavior?: ProviderInitialBehavior<OrgsUpdateIssueFieldResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_ISSUE_FIELD,
    'ORGS_UPDATE_ISSUE_FIELD',
    initialBehavior,
  );
}
