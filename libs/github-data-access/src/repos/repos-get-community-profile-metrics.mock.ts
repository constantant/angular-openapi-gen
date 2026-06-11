import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_COMMUNITY_PROFILE_METRICS } from './repos-get-community-profile-metrics.token';
import type { ReposGetCommunityProfileMetricsResponse } from './repos-get-community-profile-metrics.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-community-profile-metrics',
  path: '/repos/{owner}/{repo}/community/profile',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetCommunityProfileMetricsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCommunityProfileMetricsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_COMMUNITY_PROFILE_METRICS,
    'REPOS_GET_COMMUNITY_PROFILE_METRICS',
    initialBehavior,
    _meta,
  );
}
