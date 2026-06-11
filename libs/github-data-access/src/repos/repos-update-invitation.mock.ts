import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_INVITATION } from './repos-update-invitation.token';
import type { ReposUpdateInvitationResponse } from './repos-update-invitation.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-invitation',
  path: '/repos/{owner}/{repo}/invitations/{invitation_id}',
  method: 'patch',
  tag: 'repos',
};

export function provideReposUpdateInvitationMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateInvitationResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_INVITATION,
    'REPOS_UPDATE_INVITATION',
    initialBehavior,
    _meta,
  );
}
