import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_CODE_FREQUENCY_STATS } from './repos-get-code-frequency-stats.token';
import type { ReposGetCodeFrequencyStatsResponse } from './repos-get-code-frequency-stats.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-code-frequency-stats',
  path: '/repos/{owner}/{repo}/stats/code_frequency',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetCodeFrequencyStatsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCodeFrequencyStatsResponse>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_CODE_FREQUENCY_STATS,
    'REPOS_GET_CODE_FREQUENCY_STATS',
    initialBehavior,
    _meta,
    options,
  );
}
