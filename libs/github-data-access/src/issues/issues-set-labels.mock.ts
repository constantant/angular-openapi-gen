import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ISSUES_SET_LABELS } from './issues-set-labels.token';
import type { IssuesSetLabelsResponse } from './issues-set-labels.token';

export function provideIssuesSetLabelsMock(
  initialBehavior?: ProviderInitialBehavior<IssuesSetLabelsResponse>,
): FactoryProvider {
  return provideMockResource(
    ISSUES_SET_LABELS,
    'ISSUES_SET_LABELS',
    initialBehavior,
  );
}
