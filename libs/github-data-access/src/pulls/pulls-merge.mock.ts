import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_MERGE } from './pulls-merge.token';
import type { PullsMergeResponse } from './pulls-merge.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/merge',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/merge',
  method: 'put',
  tag: 'pulls',
};

export function providePullsMergeMock(
  initialBehavior?: ProviderInitialBehavior<PullsMergeResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_MERGE,
    'PULLS_MERGE',
    initialBehavior,
    _meta,
  );
}
