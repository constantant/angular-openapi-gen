import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_USER } from './billing-get-github-billing-premium-request-usage-report-user.token';
import type { BillingGetGithubBillingPremiumRequestUsageReportUserResponse } from './billing-get-github-billing-premium-request-usage-report-user.token';

export function provideBillingGetGithubBillingPremiumRequestUsageReportUserMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetGithubBillingPremiumRequestUsageReportUserResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_USER,
    'BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_USER',
    initialBehavior,
  );
}
