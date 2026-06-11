import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_UPDATE_PAT_ACCESSES } from './orgs-update-pat-accesses.token';
import type { OrgsUpdatePatAccessesResponse } from './orgs-update-pat-accesses.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/update-pat-accesses',
  path: '/orgs/{org}/personal-access-tokens',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsUpdatePatAccessesMock(
  initialBehavior?: ProviderInitialBehavior<OrgsUpdatePatAccessesResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_UPDATE_PAT_ACCESSES,
    'ORGS_UPDATE_PAT_ACCESSES',
    initialBehavior,
    _meta,
  );
}
