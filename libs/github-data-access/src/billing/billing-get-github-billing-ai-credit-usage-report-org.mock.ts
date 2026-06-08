import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { BILLING_GET_GITHUB_BILLING_AI_CREDIT_USAGE_REPORT_ORG } from './billing-get-github-billing-ai-credit-usage-report-org.token';
import type { BillingGetGithubBillingAiCreditUsageReportOrgResponse } from './billing-get-github-billing-ai-credit-usage-report-org.token';

export function provideBillingGetGithubBillingAiCreditUsageReportOrgMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetGithubBillingAiCreditUsageReportOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_GITHUB_BILLING_AI_CREDIT_USAGE_REPORT_ORG,
    'BILLING_GET_GITHUB_BILLING_AI_CREDIT_USAGE_REPORT_ORG',
    initialBehavior,
  );
}
