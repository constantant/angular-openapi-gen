import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { OIDC_GET_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG } from './oidc-get-oidc-custom-sub-template-for-org.token';
import type { OidcGetOidcCustomSubTemplateForOrgResponse } from './oidc-get-oidc-custom-sub-template-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'oidc/get-oidc-custom-sub-template-for-org',
  path: '/orgs/{org}/actions/oidc/customization/sub',
  method: 'get',
  tag: 'oidc',
};

export function provideOidcGetOidcCustomSubTemplateForOrgMock(
  initialBehavior?: ProviderInitialBehavior<OidcGetOidcCustomSubTemplateForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    OIDC_GET_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG,
    'OIDC_GET_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
