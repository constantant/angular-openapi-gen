import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_CHECK_IF_MERGED } from './pulls-check-if-merged.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/check-if-merged',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/merge',
  method: 'get',
  tag: 'pulls',
};

export function providePullsCheckIfMergedMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    PULLS_CHECK_IF_MERGED,
    'PULLS_CHECK_IF_MERGED',
    initialBehavior,
    _meta,
  );
}
