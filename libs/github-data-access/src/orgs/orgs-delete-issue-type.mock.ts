import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE_ISSUE_TYPE } from './orgs-delete-issue-type.token';

export function provideOrgsDeleteIssueTypeMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE_ISSUE_TYPE,
    'ORGS_DELETE_ISSUE_TYPE',
    initialBehavior,
  );
}
