import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_ORG } from './billing-get-github-billing-usage-summary-report-org.token';
import type { BillingGetGithubBillingUsageSummaryReportOrgResponse } from './billing-get-github-billing-usage-summary-report-org.token';

export function provideBillingGetGithubBillingUsageSummaryReportOrgMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetGithubBillingUsageSummaryReportOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_ORG,
    'BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_ORG',
    initialBehavior,
  );
}
