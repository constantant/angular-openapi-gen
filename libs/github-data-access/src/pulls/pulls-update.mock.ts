import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_UPDATE } from './pulls-update.token';
import type { PullsUpdateResponse } from './pulls-update.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/update',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}',
  method: 'patch',
  tag: 'pulls',
};

export function providePullsUpdateMock(
  initialBehavior?: ProviderInitialBehavior<PullsUpdateResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_UPDATE,
    'PULLS_UPDATE',
    initialBehavior,
    _meta,
  );
}
