import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_CODE_FREQUENCY_STATS } from './repos-get-code-frequency-stats.token';
import type { ReposGetCodeFrequencyStatsResponse } from './repos-get-code-frequency-stats.token';

export function provideReposGetCodeFrequencyStatsMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCodeFrequencyStatsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_CODE_FREQUENCY_STATS,
    'REPOS_GET_CODE_FREQUENCY_STATS',
    initialBehavior,
  );
}
