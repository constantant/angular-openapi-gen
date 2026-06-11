import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_REDELIVER_WEBHOOK_DELIVERY } from './repos-redeliver-webhook-delivery.token';
import type { ReposRedeliverWebhookDeliveryResponse } from './repos-redeliver-webhook-delivery.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/redeliver-webhook-delivery',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts',
  method: 'post',
  tag: 'repos',
};

export function provideReposRedeliverWebhookDeliveryMock(
  initialBehavior?: ProviderInitialBehavior<ReposRedeliverWebhookDeliveryResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_REDELIVER_WEBHOOK_DELIVERY,
    'REPOS_REDELIVER_WEBHOOK_DELIVERY',
    initialBehavior,
    _meta,
  );
}
