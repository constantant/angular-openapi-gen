import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_WEBHOOK_CONFIG_FOR_ORG } from './orgs-update-webhook-config-for-org.token';
import type { OrgsUpdateWebhookConfigForOrgResponse } from './orgs-update-webhook-config-for-org.token';

export function provideOrgsUpdateWebhookConfigForOrgMock(
  initialBehavior?: ProviderInitialBehavior<OrgsUpdateWebhookConfigForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_WEBHOOK_CONFIG_FOR_ORG,
    'ORGS_UPDATE_WEBHOOK_CONFIG_FOR_ORG',
    initialBehavior,
  );
}
