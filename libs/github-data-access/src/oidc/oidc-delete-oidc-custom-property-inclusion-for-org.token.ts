import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const OIDC_DELETE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      customPropertyName: string,
    ) => ReturnType<typeof httpResource<unknown>>
  >('OIDC_DELETE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ORG');

export function provideOidcDeleteOidcCustomPropertyInclusionForOrg(): FactoryProvider {
  return {
    provide: OIDC_DELETE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, customPropertyName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/oidc/customization/properties/repo/${customPropertyName}`,
          method: 'DELETE',
        }));
    },
  };
}
