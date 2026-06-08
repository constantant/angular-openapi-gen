import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_OUTSIDE_COLLABORATORS } from './orgs-list-outside-collaborators.token';
import type { OrgsListOutsideCollaboratorsResponse } from './orgs-list-outside-collaborators.token';

export function provideOrgsListOutsideCollaboratorsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListOutsideCollaboratorsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_OUTSIDE_COLLABORATORS,
    'ORGS_LIST_OUTSIDE_COLLABORATORS',
    initialBehavior,
  );
}
