import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_WEBHOOK_DELIVERIES } from './repos-list-webhook-deliveries.token';
import type { ReposListWebhookDeliveriesResponse } from './repos-list-webhook-deliveries.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-webhook-deliveries',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}/deliveries',
  method: 'get',
  tag: 'repos',
};

export function provideReposListWebhookDeliveriesMock(
  initialBehavior?: ProviderInitialBehavior<ReposListWebhookDeliveriesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_WEBHOOK_DELIVERIES,
    'REPOS_LIST_WEBHOOK_DELIVERIES',
    initialBehavior,
    _meta,
  );
}
