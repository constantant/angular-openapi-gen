import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { ORGS_REMOVE_MEMBER } from './orgs-remove-member.token';

export function provideOrgsRemoveMemberMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_REMOVE_MEMBER,
    'ORGS_REMOVE_MEMBER',
    initialBehavior,
  );
}
