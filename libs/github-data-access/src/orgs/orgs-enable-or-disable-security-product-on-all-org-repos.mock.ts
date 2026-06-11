import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { ORGS_ENABLE_OR_DISABLE_SECURITY_PRODUCT_ON_ALL_ORG_REPOS } from './orgs-enable-or-disable-security-product-on-all-org-repos.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'orgs/enable-or-disable-security-product-on-all-org-repos',
  path: '/orgs/{org}/{security_product}/{enablement}',
  method: 'post',
  tag: 'orgs',
};

export function provideOrgsEnableOrDisableSecurityProductOnAllOrgReposMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    ORGS_ENABLE_OR_DISABLE_SECURITY_PRODUCT_ON_ALL_ORG_REPOS,
    'ORGS_ENABLE_OR_DISABLE_SECURITY_PRODUCT_ON_ALL_ORG_REPOS',
    initialBehavior,
    _meta,
  );
}
