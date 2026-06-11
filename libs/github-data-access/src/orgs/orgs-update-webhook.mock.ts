import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_WEBHOOK } from './orgs-update-webhook.token';
import type { OrgsUpdateWebhookResponse } from './orgs-update-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/update-webhook',
  path: '/orgs/{org}/hooks/{hook_id}',
  method: 'patch',
  tag: 'orgs',
};

export function provideOrgsUpdateWebhookMock(
  initialBehavior?: ProviderInitialBehavior<OrgsUpdateWebhookResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_WEBHOOK,
    'ORGS_UPDATE_WEBHOOK',
    initialBehavior,
    _meta,
  );
}
