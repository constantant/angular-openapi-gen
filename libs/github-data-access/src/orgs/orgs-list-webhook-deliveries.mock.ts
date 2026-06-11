import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_WEBHOOK_DELIVERIES } from './orgs-list-webhook-deliveries.token';
import type { OrgsListWebhookDeliveriesResponse } from './orgs-list-webhook-deliveries.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-webhook-deliveries',
  path: '/orgs/{org}/hooks/{hook_id}/deliveries',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListWebhookDeliveriesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListWebhookDeliveriesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_WEBHOOK_DELIVERIES,
    'ORGS_LIST_WEBHOOK_DELIVERIES',
    initialBehavior,
    _meta,
  );
}
