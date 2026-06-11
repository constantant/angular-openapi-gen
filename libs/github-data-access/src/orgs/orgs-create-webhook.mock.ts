import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CREATE_WEBHOOK } from './orgs-create-webhook.token';
import type { OrgsCreateWebhookResponse } from './orgs-create-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/create-webhook',
  path: '/orgs/{org}/hooks',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsCreateWebhookMock(
  initialBehavior?: ProviderInitialBehavior<OrgsCreateWebhookResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CREATE_WEBHOOK,
    'ORGS_CREATE_WEBHOOK',
    initialBehavior,
    _meta,
  );
}
