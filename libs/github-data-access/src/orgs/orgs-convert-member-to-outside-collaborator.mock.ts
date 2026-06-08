import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_CONVERT_MEMBER_TO_OUTSIDE_COLLABORATOR } from './orgs-convert-member-to-outside-collaborator.token';
import type { OrgsConvertMemberToOutsideCollaboratorResponse } from './orgs-convert-member-to-outside-collaborator.token';

export function provideOrgsConvertMemberToOutsideCollaboratorMock(
  initialBehavior?: ProviderInitialBehavior<OrgsConvertMemberToOutsideCollaboratorResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CONVERT_MEMBER_TO_OUTSIDE_COLLABORATOR,
    'ORGS_CONVERT_MEMBER_TO_OUTSIDE_COLLABORATOR',
    initialBehavior,
  );
}
