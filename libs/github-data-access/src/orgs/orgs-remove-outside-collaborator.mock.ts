import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_REMOVE_OUTSIDE_COLLABORATOR } from './orgs-remove-outside-collaborator.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/remove-outside-collaborator',
  path: '/orgs/{org}/outside_collaborators/{username}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsRemoveOutsideCollaboratorMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REMOVE_OUTSIDE_COLLABORATOR,
    'ORGS_REMOVE_OUTSIDE_COLLABORATOR',
    initialBehavior,
    _meta,
  );
}
