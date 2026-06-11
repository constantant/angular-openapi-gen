import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CONVERT_MEMBER_TO_OUTSIDE_COLLABORATOR } from './orgs-convert-member-to-outside-collaborator.token';
import type { OrgsConvertMemberToOutsideCollaboratorResponse } from './orgs-convert-member-to-outside-collaborator.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/convert-member-to-outside-collaborator',
  path: '/orgs/{org}/outside_collaborators/{username}',
  method: 'put',
  tag: 'orgs',
};

export function provideOrgsConvertMemberToOutsideCollaboratorMock(
  initialBehavior?: ProviderInitialBehavior<OrgsConvertMemberToOutsideCollaboratorResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_CONVERT_MEMBER_TO_OUTSIDE_COLLABORATOR,
    'ORGS_CONVERT_MEMBER_TO_OUTSIDE_COLLABORATOR',
    initialBehavior,
    _meta,
  );
}
