import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_REMOVE_LABEL } from './issues-remove-label.token';
import type { IssuesRemoveLabelResponse } from './issues-remove-label.token';

export function provideIssuesRemoveLabelMock(
  initialBehavior?: ProviderInitialBehavior<IssuesRemoveLabelResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REMOVE_LABEL,
    'ISSUES_REMOVE_LABEL',
    initialBehavior,
  );
}
