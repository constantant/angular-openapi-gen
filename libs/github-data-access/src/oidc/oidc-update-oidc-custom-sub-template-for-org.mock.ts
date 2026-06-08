import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { OIDC_UPDATE_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG } from './oidc-update-oidc-custom-sub-template-for-org.token';
import type { OidcUpdateOidcCustomSubTemplateForOrgResponse } from './oidc-update-oidc-custom-sub-template-for-org.token';

export function provideOidcUpdateOidcCustomSubTemplateForOrgMock(
  initialBehavior?: ProviderInitialBehavior<OidcUpdateOidcCustomSubTemplateForOrgResponse>,
): FactoryProvider {
  return provideMockResource(
    OIDC_UPDATE_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG,
    'OIDC_UPDATE_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG',
    initialBehavior,
  );
}
