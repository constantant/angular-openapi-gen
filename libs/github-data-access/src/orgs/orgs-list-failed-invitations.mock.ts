import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_LIST_FAILED_INVITATIONS } from './orgs-list-failed-invitations.token';
import type { OrgsListFailedInvitationsResponse } from './orgs-list-failed-invitations.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/list-failed-invitations',
  path: '/orgs/{org}/failed_invitations',
  method: 'get',
  tag: 'orgs',
};

export function provideOrgsListFailedInvitationsMock(
  initialBehavior?: ProviderInitialBehavior<OrgsListFailedInvitationsResponse>,
): FactoryProvider {
  return provideMockResource(
    ORGS_LIST_FAILED_INVITATIONS,
    'ORGS_LIST_FAILED_INVITATIONS',
    initialBehavior,
    _meta,
  );
}
