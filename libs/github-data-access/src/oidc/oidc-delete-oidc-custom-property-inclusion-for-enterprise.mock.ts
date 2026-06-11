import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { OIDC_DELETE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ENTERPRISE } from './oidc-delete-oidc-custom-property-inclusion-for-enterprise.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'oidc/delete-oidc-custom-property-inclusion-for-enterprise',
  path: '/enterprises/{enterprise}/actions/oidc/customization/properties/repo/{custom_property_name}',
  method: 'delete',
  tag: 'oidc',
};

export function provideOidcDeleteOidcCustomPropertyInclusionForEnterpriseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    OIDC_DELETE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ENTERPRISE,
    'OIDC_DELETE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ENTERPRISE',
    initialBehavior,
    _meta,
  );
}
