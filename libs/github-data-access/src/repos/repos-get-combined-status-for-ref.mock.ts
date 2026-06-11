import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_COMBINED_STATUS_FOR_REF } from './repos-get-combined-status-for-ref.token';
import type { ReposGetCombinedStatusForRefResponse } from './repos-get-combined-status-for-ref.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-combined-status-for-ref',
  path: '/repos/{owner}/{repo}/commits/{ref}/status',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetCombinedStatusForRefMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetCombinedStatusForRefResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_COMBINED_STATUS_FOR_REF,
    'REPOS_GET_COMBINED_STATUS_FOR_REF',
    initialBehavior,
    _meta,
  );
}
