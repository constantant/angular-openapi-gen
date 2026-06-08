import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_ADD_LABELS } from './issues-add-labels.token';
import type { IssuesAddLabelsResponse } from './issues-add-labels.token';

export function provideIssuesAddLabelsMock(
  initialBehavior?: ProviderInitialBehavior<IssuesAddLabelsResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_ADD_LABELS,
    'ISSUES_ADD_LABELS',
    initialBehavior,
  );
}
