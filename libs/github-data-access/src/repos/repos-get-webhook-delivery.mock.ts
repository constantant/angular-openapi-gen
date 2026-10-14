import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetWebhookDelivery,
  type ReposGetWebhookDeliveryResponse,
} from './repos-get-webhook-delivery.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-webhook-delivery',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_WEBHOOK_DELIVERY_MOCK: MockEndpoint<ReposGetWebhookDeliveryResponse> =
  {
    key: 'REPOS_GET_WEBHOOK_DELIVERY',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetWebhookDelivery,
  };

export function provideReposGetWebhookDeliveryMock(
  initialBehavior?: MockEndpointBehavior<ReposGetWebhookDeliveryResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_WEBHOOK_DELIVERY_MOCK, initialBehavior);
}
