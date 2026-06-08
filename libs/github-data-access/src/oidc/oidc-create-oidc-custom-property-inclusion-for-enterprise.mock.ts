import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { OIDC_CREATE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ENTERPRISE } from './oidc-create-oidc-custom-property-inclusion-for-enterprise.token';
import type { OidcCreateOidcCustomPropertyInclusionForEnterpriseResponse } from './oidc-create-oidc-custom-property-inclusion-for-enterprise.token';

export function provideOidcCreateOidcCustomPropertyInclusionForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<OidcCreateOidcCustomPropertyInclusionForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    OIDC_CREATE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ENTERPRISE,
    'OIDC_CREATE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ENTERPRISE',
    initialBehavior,
  );
}
