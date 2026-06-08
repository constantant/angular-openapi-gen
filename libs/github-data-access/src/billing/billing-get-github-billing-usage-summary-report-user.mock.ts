import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_USER } from './billing-get-github-billing-usage-summary-report-user.token';
import type { BillingGetGithubBillingUsageSummaryReportUserResponse } from './billing-get-github-billing-usage-summary-report-user.token';

export function provideBillingGetGithubBillingUsageSummaryReportUserMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetGithubBillingUsageSummaryReportUserResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_USER,
    'BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_USER',
    initialBehavior,
  );
}
