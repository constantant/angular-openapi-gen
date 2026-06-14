import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OidcListOidcCustomPropertyInclusionsForEnterpriseResponse =
  paths['/enterprises/{enterprise}/actions/oidc/customization/properties/repo']['get']['responses']['200']['content']['application/json'];

export const OIDC_LIST_OIDC_CUSTOM_PROPERTY_INCLUSIONS_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
    ) => ReturnType<
      typeof httpResource<OidcListOidcCustomPropertyInclusionsForEnterpriseResponse>
    >
  >('OIDC_LIST_OIDC_CUSTOM_PROPERTY_INCLUSIONS_FOR_ENTERPRISE');

export function provideOidcListOidcCustomPropertyInclusionsForEnterprise(): FactoryProvider {
  return {
    provide: OIDC_LIST_OIDC_CUSTOM_PROPERTY_INCLUSIONS_FOR_ENTERPRISE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (enterprise: string) =>
        httpResource<OidcListOidcCustomPropertyInclusionsForEnterpriseResponse>(
          () => ({
            url: `${base}/enterprises/${enterprise}/actions/oidc/customization/properties/repo`,
          }),
        );
    },
  };
}
