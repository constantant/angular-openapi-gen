import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ORG } from './dependabot-update-repository-access-for-org.token';

export function provideDependabotUpdateRepositoryAccessForOrgMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ORG,
    'DEPENDABOT_UPDATE_REPOSITORY_ACCESS_FOR_ORG',
    initialBehavior,
  );
}
