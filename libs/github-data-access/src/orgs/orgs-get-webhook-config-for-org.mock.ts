import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_GET_WEBHOOK_CONFIG_FOR_ORG } from './orgs-get-webhook-config-for-org.token';
import type { OrgsGetWebhookConfigForOrgResponse } from './orgs-get-webhook-config-for-org.token';

export function provideOrgsGetWebhookConfigForOrgMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetWebhookConfigForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_WEBHOOK_CONFIG_FOR_ORG,
    'ORGS_GET_WEBHOOK_CONFIG_FOR_ORG',
    initialBehavior,
  );
}
