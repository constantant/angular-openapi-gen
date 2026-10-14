import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposTestPushWebhook } from './repos-test-push-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/test-push-webhook',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}/tests',
  method: 'post',
  tag: 'repos',
};

export const REPOS_TEST_PUSH_WEBHOOK_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_TEST_PUSH_WEBHOOK',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposTestPushWebhook,
};

export function provideReposTestPushWebhookMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_TEST_PUSH_WEBHOOK_MOCK, initialBehavior);
}
