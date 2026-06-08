import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { BILLING_GET_GITHUB_BILLING_USAGE_REPORT_ORG } from './billing-get-github-billing-usage-report-org.token';
import type { BillingGetGithubBillingUsageReportOrgResponse } from './billing-get-github-billing-usage-report-org.token';

export function provideBillingGetGithubBillingUsageReportOrgMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetGithubBillingUsageReportOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_GITHUB_BILLING_USAGE_REPORT_ORG,
    'BILLING_GET_GITHUB_BILLING_USAGE_REPORT_ORG',
    initialBehavior,
  );
}
