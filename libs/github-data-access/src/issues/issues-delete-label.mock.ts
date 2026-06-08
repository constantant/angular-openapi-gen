import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_DELETE_LABEL } from './issues-delete-label.token';

export function provideIssuesDeleteLabelMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_DELETE_LABEL,
    'ISSUES_DELETE_LABEL',
    initialBehavior,
  );
}
