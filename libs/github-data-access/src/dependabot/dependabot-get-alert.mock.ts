import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { DEPENDABOT_GET_ALERT } from './dependabot-get-alert.token';
import type { DependabotGetAlertResponse } from './dependabot-get-alert.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'dependabot/get-alert',
  path: '/repos/{owner}/{repo}/dependabot/alerts/{alert_number}',
  method: 'get',
  tag: 'dependabot',
};

export function provideDependabotGetAlertMock(
  initialBehavior?: ProviderInitialBehavior<DependabotGetAlertResponse>,
): FactoryProvider {
  return provideMockResource(
    DEPENDABOT_GET_ALERT,
    'DEPENDABOT_GET_ALERT',
    initialBehavior,
    _meta,
  );
}
