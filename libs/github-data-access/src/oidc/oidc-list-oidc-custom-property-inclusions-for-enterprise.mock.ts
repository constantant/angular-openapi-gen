import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { OIDC_LIST_OIDC_CUSTOM_PROPERTY_INCLUSIONS_FOR_ENTERPRISE } from './oidc-list-oidc-custom-property-inclusions-for-enterprise.token';
import type { OidcListOidcCustomPropertyInclusionsForEnterpriseResponse } from './oidc-list-oidc-custom-property-inclusions-for-enterprise.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'oidc/list-oidc-custom-property-inclusions-for-enterprise',
  path: '/enterprises/{enterprise}/actions/oidc/customization/properties/repo',
  method: 'get',
  tag: 'oidc',
};

export function provideOidcListOidcCustomPropertyInclusionsForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<OidcListOidcCustomPropertyInclusionsForEnterpriseResponse>,
): FactoryProvider {
  return provideMockResource(
    OIDC_LIST_OIDC_CUSTOM_PROPERTY_INCLUSIONS_FOR_ENTERPRISE,
    'OIDC_LIST_OIDC_CUSTOM_PROPERTY_INCLUSIONS_FOR_ENTERPRISE',
    initialBehavior,
    _meta,
  );
}
