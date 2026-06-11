import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_UPDATE_ALERT } from './dependabot-update-alert.token';
import type { DependabotUpdateAlertResponse } from './dependabot-update-alert.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/update-alert',
  path: '/repos/{owner}/{repo}/dependabot/alerts/{alert_number}',
  method: 'patch',
  tag: 'dependabot',
};

export function provideDependabotUpdateAlertMock(
  initialBehavior?: ProviderInitialBehavior<DependabotUpdateAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_UPDATE_ALERT,
    'DEPENDABOT_UPDATE_ALERT',
    initialBehavior,
    _meta,
  );
}
