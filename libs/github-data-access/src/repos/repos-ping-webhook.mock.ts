import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposPingWebhook } from './repos-ping-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/ping-webhook',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}/pings',
  method: 'post',
  tag: 'repos',
};

export const REPOS_PING_WEBHOOK_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_PING_WEBHOOK',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposPingWebhook,
};

export function provideReposPingWebhookMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_PING_WEBHOOK_MOCK, initialBehavior);
}
