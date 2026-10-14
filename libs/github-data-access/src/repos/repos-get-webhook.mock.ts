import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetWebhook,
  type ReposGetWebhookResponse,
} from './repos-get-webhook.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-webhook',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_WEBHOOK_MOCK: MockEndpoint<ReposGetWebhookResponse> = {
  key: 'REPOS_GET_WEBHOOK',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposGetWebhook,
};

export function provideReposGetWebhookMock(
  initialBehavior?: MockEndpointBehavior<ReposGetWebhookResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_WEBHOOK_MOCK, initialBehavior);
}
