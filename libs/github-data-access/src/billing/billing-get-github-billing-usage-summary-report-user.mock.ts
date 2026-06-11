import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_USER } from './billing-get-github-billing-usage-summary-report-user.token';
import type { BillingGetGithubBillingUsageSummaryReportUserResponse } from './billing-get-github-billing-usage-summary-report-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'billing/get-github-billing-usage-summary-report-user',
  path: '/users/{username}/settings/billing/usage/summary',
  method: 'get',
  tag: 'billing',
};

export function provideBillingGetGithubBillingUsageSummaryReportUserMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetGithubBillingUsageSummaryReportUserResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_USER,
    'BILLING_GET_GITHUB_BILLING_USAGE_SUMMARY_REPORT_USER',
    initialBehavior,
    _meta,
  );
}
