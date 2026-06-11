import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { SECURITY_ADVISORIES_LIST_GLOBAL_ADVISORIES } from './security-advisories-list-global-advisories.token';
import type { SecurityAdvisoriesListGlobalAdvisoriesResponse } from './security-advisories-list-global-advisories.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'security-advisories/list-global-advisories',
  path: '/advisories',
  method: 'get',
  tag: 'security-advisories',
};

export function provideSecurityAdvisoriesListGlobalAdvisoriesMock(
  initialBehavior?: ProviderInitialBehavior<SecurityAdvisoriesListGlobalAdvisoriesResponse>,
): FactoryProvider {
  return provideMockResource(
    SECURITY_ADVISORIES_LIST_GLOBAL_ADVISORIES,
    'SECURITY_ADVISORIES_LIST_GLOBAL_ADVISORIES',
    initialBehavior,
    _meta,
  );
}
