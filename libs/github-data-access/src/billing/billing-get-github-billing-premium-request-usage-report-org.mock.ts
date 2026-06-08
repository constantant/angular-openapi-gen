import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_ORG } from './billing-get-github-billing-premium-request-usage-report-org.token';
import type { BillingGetGithubBillingPremiumRequestUsageReportOrgResponse } from './billing-get-github-billing-premium-request-usage-report-org.token';

export function provideBillingGetGithubBillingPremiumRequestUsageReportOrgMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetGithubBillingPremiumRequestUsageReportOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_ORG,
    'BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_ORG',
    initialBehavior,
  );
}
