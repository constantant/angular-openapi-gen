import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_GET_ALERT } from './dependabot-get-alert.token';
import type { DependabotGetAlertResponse } from './dependabot-get-alert.token';

export function provideDependabotGetAlertMock(
  initialBehavior?: ProviderInitialBehavior<DependabotGetAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_GET_ALERT,
    'DEPENDABOT_GET_ALERT',
    initialBehavior,
  );
}
