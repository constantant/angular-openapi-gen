import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE_ISSUE_FIELD } from './orgs-delete-issue-field.token';

export function provideOrgsDeleteIssueFieldMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE_ISSUE_FIELD,
    'ORGS_DELETE_ISSUE_FIELD',
    initialBehavior,
  );
}
