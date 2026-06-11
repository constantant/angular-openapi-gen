import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_ALL_TOPICS } from './repos-get-all-topics.token';
import type { ReposGetAllTopicsResponse } from './repos-get-all-topics.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-all-topics',
  path: '/repos/{owner}/{repo}/topics',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetAllTopicsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetAllTopicsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_ALL_TOPICS,
    'REPOS_GET_ALL_TOPICS',
    initialBehavior,
    _meta,
  );
}
