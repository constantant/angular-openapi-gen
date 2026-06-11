import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_GET_WEBHOOK_DELIVERY } from './orgs-get-webhook-delivery.token';
import type { OrgsGetWebhookDeliveryResponse } from './orgs-get-webhook-delivery.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/get-webhook-delivery',
  path: '/orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsGetWebhookDeliveryMock(
  initialBehavior?: ProviderInitialBehavior<OrgsGetWebhookDeliveryResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_GET_WEBHOOK_DELIVERY,
    'ORGS_GET_WEBHOOK_DELIVERY',
    initialBehavior,
    _meta,
  );
}
