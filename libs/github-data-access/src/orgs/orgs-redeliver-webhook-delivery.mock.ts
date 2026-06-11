import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_REDELIVER_WEBHOOK_DELIVERY } from './orgs-redeliver-webhook-delivery.token';
import type { OrgsRedeliverWebhookDeliveryResponse } from './orgs-redeliver-webhook-delivery.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/redeliver-webhook-delivery',
  path: '/orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsRedeliverWebhookDeliveryMock(
  initialBehavior?: ProviderInitialBehavior<OrgsRedeliverWebhookDeliveryResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REDELIVER_WEBHOOK_DELIVERY,
    'ORGS_REDELIVER_WEBHOOK_DELIVERY',
    initialBehavior,
    _meta,
  );
}
