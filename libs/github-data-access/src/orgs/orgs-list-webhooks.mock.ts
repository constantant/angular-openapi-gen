import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_WEBHOOKS } from './orgs-list-webhooks.token';
import type { OrgsListWebhooksResponse } from './orgs-list-webhooks.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-webhooks',
  path: '/orgs/{org}/hooks',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListWebhooksMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListWebhooksResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_WEBHOOKS,
    'ORGS_LIST_WEBHOOKS',
    initialBehavior,
    _meta,
  );
}
