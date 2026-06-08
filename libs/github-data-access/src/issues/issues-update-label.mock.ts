import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_UPDATE_LABEL } from './issues-update-label.token';
import type { IssuesUpdateLabelResponse } from './issues-update-label.token';

export function provideIssuesUpdateLabelMock(
  initialBehavior?: ProviderInitialBehavior<IssuesUpdateLabelResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_UPDATE_LABEL,
    'ISSUES_UPDATE_LABEL',
    initialBehavior,
  );
}
