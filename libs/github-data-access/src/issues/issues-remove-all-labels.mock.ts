import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_REMOVE_ALL_LABELS } from './issues-remove-all-labels.token';

export function provideIssuesRemoveAllLabelsMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_REMOVE_ALL_LABELS,
    'ISSUES_REMOVE_ALL_LABELS',
    initialBehavior,
  );
}
