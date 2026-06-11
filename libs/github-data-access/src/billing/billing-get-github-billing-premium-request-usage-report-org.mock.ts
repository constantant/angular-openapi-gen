import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_ORG } from './billing-get-github-billing-premium-request-usage-report-org.token';
import type { BillingGetGithubBillingPremiumRequestUsageReportOrgResponse } from './billing-get-github-billing-premium-request-usage-report-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'billing/get-github-billing-premium-request-usage-report-org',
  path: '/organizations/{org}/settings/billing/premium_request/usage',
  method: 'get',
  tag: 'billing',
};

export function provideBillingGetGithubBillingPremiumRequestUsageReportOrgMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetGithubBillingPremiumRequestUsageReportOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_ORG,
    'BILLING_GET_GITHUB_BILLING_PREMIUM_REQUEST_USAGE_REPORT_ORG',
    initialBehavior,
    _meta,
  );
}
