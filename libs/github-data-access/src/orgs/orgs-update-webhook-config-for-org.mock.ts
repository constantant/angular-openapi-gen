import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_WEBHOOK_CONFIG_FOR_ORG } from './orgs-update-webhook-config-for-org.token';
import type { OrgsUpdateWebhookConfigForOrgResponse } from './orgs-update-webhook-config-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/update-webhook-config-for-org',
  path: '/orgs/{org}/hooks/{hook_id}/config',
  method: 'patch',
  tag: 'orgs',
};

export function provideOrgsUpdateWebhookConfigForOrgMock(
  initialBehavior?: ProviderInitialBehavior<OrgsUpdateWebhookConfigForOrgResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_WEBHOOK_CONFIG_FOR_ORG,
    'ORGS_UPDATE_WEBHOOK_CONFIG_FOR_ORG',
    initialBehavior,
    _meta,
    options,
  );
}
