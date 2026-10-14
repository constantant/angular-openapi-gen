import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetWebhookConfigForRepo,
  type ReposGetWebhookConfigForRepoResponse,
} from './repos-get-webhook-config-for-repo.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-webhook-config-for-repo',
  path: '/repos/{owner}/{repo}/hooks/{hook_id}/config',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_WEBHOOK_CONFIG_FOR_REPO_MOCK: MockEndpoint<ReposGetWebhookConfigForRepoResponse> =
  {
    key: 'REPOS_GET_WEBHOOK_CONFIG_FOR_REPO',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetWebhookConfigForRepo,
  };

export function provideReposGetWebhookConfigForRepoMock(
  initialBehavior?: MockEndpointBehavior<ReposGetWebhookConfigForRepoResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_WEBHOOK_CONFIG_FOR_REPO_MOCK,
    initialBehavior,
  );
}
