import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { PULLS_LIST_FILES } from './pulls-list-files.token';
import type { PullsListFilesResponse } from './pulls-list-files.token';

export function providePullsListFilesMock(
  initialBehavior?: ProviderInitialBehavior<PullsListFilesResponse>,
): FactoryProvider {
  return provideMockResource(
    PULLS_LIST_FILES,
    'PULLS_LIST_FILES',
    initialBehavior,
  );
}
