import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_UPDATE_ALERT } from './dependabot-update-alert.token';
import type { DependabotUpdateAlertResponse } from './dependabot-update-alert.token';

export function provideDependabotUpdateAlertMock(
  initialBehavior?: ProviderInitialBehavior<DependabotUpdateAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_UPDATE_ALERT,
    'DEPENDABOT_UPDATE_ALERT',
    initialBehavior,
  );
}
