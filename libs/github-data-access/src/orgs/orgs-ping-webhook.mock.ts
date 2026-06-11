import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_PING_WEBHOOK } from './orgs-ping-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/ping-webhook',
  path: '/orgs/{org}/hooks/{hook_id}/pings',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsPingWebhookMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_PING_WEBHOOK,
    'ORGS_PING_WEBHOOK',
    initialBehavior,
    _meta,
  );
}
