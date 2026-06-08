import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_UPDATE_BRANCH } from './pulls-update-branch.token';
import type { PullsUpdateBranchResponse } from './pulls-update-branch.token';

export function providePullsUpdateBranchMock(
  initialBehavior?: ProviderInitialBehavior<PullsUpdateBranchResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_UPDATE_BRANCH,
    'PULLS_UPDATE_BRANCH',
    initialBehavior,
  );
}
