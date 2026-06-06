import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OidcGetOidcCustomSubTemplateForOrgResponse =
  paths['/orgs/{org}/actions/oidc/customization/sub']['get']['responses']['200']['content']['application/json'];

export const OIDC_GET_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG = new InjectionToken<
  (
    org: string,
  ) => ReturnType<
    typeof httpResource<OidcGetOidcCustomSubTemplateForOrgResponse>
  >
>('OIDC_GET_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG');

export function provideOidcGetOidcCustomSubTemplateForOrg(): FactoryProvider {
  return {
    provide: OIDC_GET_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<OidcGetOidcCustomSubTemplateForOrgResponse>(() => ({
          url: `${base}/orgs/${org}/actions/oidc/customization/sub`,
        }));
    },
  };
}
