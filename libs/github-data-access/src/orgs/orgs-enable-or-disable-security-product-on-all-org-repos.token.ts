import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsEnableOrDisableSecurityProductOnAllOrgReposBody = NonNullable<
  paths['/orgs/{org}/{security_product}/{enablement}']['post']['requestBody']
>['content']['application/json'];

export const ORGS_ENABLE_OR_DISABLE_SECURITY_PRODUCT_ON_ALL_ORG_REPOS =
  new InjectionToken<
    (
      org: string,
      securityProduct: string,
      enablement: string,
      body:
        | OrgsEnableOrDisableSecurityProductOnAllOrgReposBody
        | Signal<OrgsEnableOrDisableSecurityProductOnAllOrgReposBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ORGS_ENABLE_OR_DISABLE_SECURITY_PRODUCT_ON_ALL_ORG_REPOS');

export function provideOrgsEnableOrDisableSecurityProductOnAllOrgRepos(): FactoryProvider {
  return {
    provide: ORGS_ENABLE_OR_DISABLE_SECURITY_PRODUCT_ON_ALL_ORG_REPOS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        securityProduct: string,
        enablement: string,
        body:
          | OrgsEnableOrDisableSecurityProductOnAllOrgReposBody
          | Signal<OrgsEnableOrDisableSecurityProductOnAllOrgReposBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/${securityProduct}/${enablement}`,
          method: 'POST',
          body,
        }));
    },
  };
}
