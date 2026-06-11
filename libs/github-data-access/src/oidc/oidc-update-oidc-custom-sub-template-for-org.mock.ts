import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { OIDC_UPDATE_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG } from './oidc-update-oidc-custom-sub-template-for-org.token';
import type { OidcUpdateOidcCustomSubTemplateForOrgResponse } from './oidc-update-oidc-custom-sub-template-for-org.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'oidc/update-oidc-custom-sub-template-for-org',
  path: '/orgs/{org}/actions/oidc/customization/sub',
  method: 'put',
  tag: 'oidc',
};

export function provideOidcUpdateOidcCustomSubTemplateForOrgMock(
  initialBehavior?: ProviderInitialBehavior<OidcUpdateOidcCustomSubTemplateForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    OIDC_UPDATE_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG,
    'OIDC_UPDATE_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG',
    initialBehavior,
    _meta,
  );
}
