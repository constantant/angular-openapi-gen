import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_CREATE_LABEL } from './issues-create-label.token';
import type { IssuesCreateLabelResponse } from './issues-create-label.token';

export function provideIssuesCreateLabelMock(
  initialBehavior?: ProviderInitialBehavior<IssuesCreateLabelResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_CREATE_LABEL,
    'ISSUES_CREATE_LABEL',
    initialBehavior,
  );
}
