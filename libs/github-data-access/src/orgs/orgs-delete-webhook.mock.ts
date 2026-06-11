import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_DELETE_WEBHOOK } from './orgs-delete-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/delete-webhook',
  path: '/orgs/{org}/hooks/{hook_id}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsDeleteWebhookMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_DELETE_WEBHOOK,
    'ORGS_DELETE_WEBHOOK',
    initialBehavior,
    _meta,
  );
}
