import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_ORG } from './billing-get-github-billing-usage-summary-report-org.token';
import type { BillingGetGithubBillingUsageSummaryReportOrgResponse } from './billing-get-github-billing-usage-summary-report-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'billing/get-github-billing-usage-summary-report-org',
  path: '/organizations/{org}/settings/billing/usage/summary',
  method: 'get',
  tag: 'billing',
};

export function provideBillingGetGithubBillingUsageSummaryReportOrgMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetGithubBillingUsageSummaryReportOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_ORG,
    'BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_ORG',
    initialBehavior,
    _meta,
  );
}
