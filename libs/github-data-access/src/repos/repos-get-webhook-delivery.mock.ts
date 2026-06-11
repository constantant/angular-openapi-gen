import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_WEBHOOK_DELIVERY } from './repos-get-webhook-delivery.token';
import type { ReposGetWebhookDeliveryResponse } from './repos-get-webhook-delivery.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-webhook-delivery',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetWebhookDeliveryMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetWebhookDeliveryResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_WEBHOOK_DELIVERY,
    'REPOS_GET_WEBHOOK_DELIVERY',
    initialBehavior,
    _meta,
  );
}
