import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_REMOVE_OUTSIDE_COLLABORATOR } from './orgs-remove-outside-collaborator.token';

export function provideOrgsRemoveOutsideCollaboratorMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REMOVE_OUTSIDE_COLLABORATOR,
    'ORGS_REMOVE_OUTSIDE_COLLABORATOR',
    initialBehavior,
  );
}
