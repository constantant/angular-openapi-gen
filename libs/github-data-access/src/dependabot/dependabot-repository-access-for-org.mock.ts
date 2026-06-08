import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_REPOSITORY_ACCESS_FOR_ORG } from './dependabot-repository-access-for-org.token';
import type { DependabotRepositoryAccessForOrgResponse } from './dependabot-repository-access-for-org.token';

export function provideDependabotRepositoryAccessForOrgMock(
  initialBehavior?: ProviderInitialBehavior<DependabotRepositoryAccessForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_REPOSITORY_ACCESS_FOR_ORG,
    'DEPENDABOT_REPOSITORY_ACCESS_FOR_ORG',
    initialBehavior,
  );
}
