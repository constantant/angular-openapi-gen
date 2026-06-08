import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_CREATE_IN_ORG } from './repos-create-in-org.token';
import type { ReposCreateInOrgResponse } from './repos-create-in-org.token';

export function provideReposCreateInOrgMock(
  initialBehavior?: ProviderInitialBehavior<ReposCreateInOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CREATE_IN_ORG,
    'REPOS_CREATE_IN_ORG',
    initialBehavior,
  );
}
