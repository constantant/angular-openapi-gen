import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { CODE_SCANNING_LIST_ALERTS_FOR_ORG } from './code-scanning-list-alerts-for-org.token';
import type { CodeScanningListAlertsForOrgResponse } from './code-scanning-list-alerts-for-org.token';

export function provideCodeScanningListAlertsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<CodeScanningListAlertsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    CODE_SCANNING_LIST_ALERTS_FOR_ORG,
    'CODE_SCANNING_LIST_ALERTS_FOR_ORG',
    initialBehavior,
  );
}
