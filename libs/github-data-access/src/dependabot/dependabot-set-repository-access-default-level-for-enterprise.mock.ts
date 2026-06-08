import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_SET_REPOSITORY_ACCESS_DEFAULT_LEVEL_FOR_ENTERPRISE } from './dependabot-set-repository-access-default-level-for-enterprise.token';

export function provideDependabotSetRepositoryAccessDefaultLevelForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_SET_REPOSITORY_ACCESS_DEFAULT_LEVEL_FOR_ENTERPRISE,
    'DEPENDABOT_SET_REPOSITORY_ACCESS_DEFAULT_LEVEL_FOR_ENTERPRISE',
    initialBehavior,
  );
}
