import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_CREATE } from './pulls-create.token';
import type { PullsCreateResponse } from './pulls-create.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/create',
  path: '/repos/{owner}/{repo}/pulls',
  method: 'post',
  tag: 'pulls',
};

export function providePullsCreateMock(
  initialBehavior?: ProviderInitialBehavior<PullsCreateResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_CREATE,
    'PULLS_CREATE',
    initialBehavior,
    _meta,
  );
}
