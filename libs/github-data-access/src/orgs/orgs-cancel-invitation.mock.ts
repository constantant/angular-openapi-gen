import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockProviderOptions,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_CANCEL_INVITATION } from './orgs-cancel-invitation.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/cancel-invitation',
  path: '/orgs/{org}/invitations/{invitation_id}',
  method: 'delete',
  tag: 'orgs',
};

export function provideOrgsCancelInvitationMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
  options?: MockProviderOptions,
): FactoryProvider {
  return provideMockResource(
    ORGS_CANCEL_INVITATION,
    'ORGS_CANCEL_INVITATION',
    initialBehavior,
    _meta,
    options,
  );
}
