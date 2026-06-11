import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_OUTSIDE_COLLABORATORS } from './orgs-list-outside-collaborators.token';
import type { OrgsListOutsideCollaboratorsResponse } from './orgs-list-outside-collaborators.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-outside-collaborators',
  path: '/orgs/{org}/outside_collaborators',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListOutsideCollaboratorsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListOutsideCollaboratorsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_OUTSIDE_COLLABORATORS,
    'ORGS_LIST_OUTSIDE_COLLABORATORS',
    initialBehavior,
    _meta,
  );
}
