import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { OIDC_LIST_OIDC_CUSTOM_PROPERTY_INCLUSIONS_FOR_ORG } from './oidc-list-oidc-custom-property-inclusions-for-org.token';
import type { OidcListOidcCustomPropertyInclusionsForOrgResponse } from './oidc-list-oidc-custom-property-inclusions-for-org.token';

export function provideOidcListOidcCustomPropertyInclusionsForOrgMock(
  initialBehavior?: ProviderInitialBehavior<OidcListOidcCustomPropertyInclusionsForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    OIDC_LIST_OIDC_CUSTOM_PROPERTY_INCLUSIONS_FOR_ORG,
    'OIDC_LIST_OIDC_CUSTOM_PROPERTY_INCLUSIONS_FOR_ORG',
    initialBehavior,
  );
}
