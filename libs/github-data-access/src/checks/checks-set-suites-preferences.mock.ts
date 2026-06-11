import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { CHECKS_SET_SUITES_PREFERENCES } from './checks-set-suites-preferences.token';
import type { ChecksSetSuitesPreferencesResponse } from './checks-set-suites-preferences.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'checks/set-suites-preferences',
  path: '/repos/{owner}/{repo}/check-suites/preferences',
  method: 'patch',
  tag: 'checks',
};

export function provideChecksSetSuitesPreferencesMock(
  initialBehavior?: ProviderInitialBehavior<ChecksSetSuitesPreferencesResponse>,
): FactoryProvider {
  return provideMockResource(
    CHECKS_SET_SUITES_PREFERENCES,
    'CHECKS_SET_SUITES_PREFERENCES',
    initialBehavior,
    _meta,
  );
}
