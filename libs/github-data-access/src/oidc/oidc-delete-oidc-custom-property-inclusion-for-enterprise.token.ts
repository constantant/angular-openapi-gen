import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const OIDC_DELETE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
      customPropertyName: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('OIDC_DELETE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ENTERPRISE');

export function provideOidcDeleteOidcCustomPropertyInclusionForEnterprise(): FactoryProvider {
  return {
    provide: OIDC_DELETE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ENTERPRISE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (enterprise: string, customPropertyName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/enterprises/${enterprise}/actions/oidc/customization/properties/repo/${customPropertyName}`,
          method: 'DELETE',
        }));
    },
  };
}
