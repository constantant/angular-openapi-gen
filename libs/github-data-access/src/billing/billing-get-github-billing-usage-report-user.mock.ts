import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { BILLING_GET_GITHUB_BILLING_USAGE_REPORT_USER } from './billing-get-github-billing-usage-report-user.token';
import type { BillingGetGithubBillingUsageReportUserResponse } from './billing-get-github-billing-usage-report-user.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'billing/get-github-billing-usage-report-user',
  path: '/users/{username}/settings/billing/usage',
  method: 'get',
  tag: 'billing',
};

export function provideBillingGetGithubBillingUsageReportUserMock(
  initialBehavior?: ProviderInitialBehavior<BillingGetGithubBillingUsageReportUserResponse>,
): FactoryProvider {
  return provideMockResource(
    BILLING_GET_GITHUB_BILLING_USAGE_REPORT_USER,
    'BILLING_GET_GITHUB_BILLING_USAGE_REPORT_USER',
    initialBehavior,
    _meta,
  );
}
