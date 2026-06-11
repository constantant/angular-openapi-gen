import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { PULLS_UPDATE_BRANCH } from './pulls-update-branch.token';
import type { PullsUpdateBranchResponse } from './pulls-update-branch.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'pulls/update-branch',
  path: '/repos/{owner}/{repo}/pulls/{pull_number}/update-branch',
  method: 'put',
  tag: 'pulls',
};

export function providePullsUpdateBranchMock(
  initialBehavior?: ProviderInitialBehavior<PullsUpdateBranchResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_UPDATE_BRANCH,
    'PULLS_UPDATE_BRANCH',
    initialBehavior,
    _meta,
  );
}
