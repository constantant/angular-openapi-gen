import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { OIDC_CREATE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ORG } from './oidc-create-oidc-custom-property-inclusion-for-org.token';
import type { OidcCreateOidcCustomPropertyInclusionForOrgResponse } from './oidc-create-oidc-custom-property-inclusion-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'oidc/create-oidc-custom-property-inclusion-for-org',
  path: '/orgs/{org}/actions/oidc/customization/properties/repo',
  method: 'post',
  tag: 'oidc',
};

export function provideOidcCreateOidcCustomPropertyInclusionForOrgMock(
  initialBehavior?: ProviderInitialBehavior<OidcCreateOidcCustomPropertyInclusionForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    OIDC_CREATE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ORG,
    'OIDC_CREATE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
