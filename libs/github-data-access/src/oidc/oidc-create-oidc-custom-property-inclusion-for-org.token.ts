import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OidcCreateOidcCustomPropertyInclusionForOrgBody = NonNullable<
  paths['/orgs/{org}/actions/oidc/customization/properties/repo']['post']['requestBody']
>['content']['application/json'];

export type OidcCreateOidcCustomPropertyInclusionForOrgResponse =
  paths['/orgs/{org}/actions/oidc/customization/properties/repo']['post']['responses']['201']['content']['application/json'];

export const OIDC_CREATE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ORG =
  new InjectionToken<
    (
      org: string,
      body:
        | OidcCreateOidcCustomPropertyInclusionForOrgBody
        | Signal<OidcCreateOidcCustomPropertyInclusionForOrgBody>,
    ) => ReturnType<
      typeof httpResource<OidcCreateOidcCustomPropertyInclusionForOrgResponse>
    >
  >('OIDC_CREATE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ORG');

export function provideOidcCreateOidcCustomPropertyInclusionForOrg(): FactoryProvider {
  return {
    provide: OIDC_CREATE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | OidcCreateOidcCustomPropertyInclusionForOrgBody
          | Signal<OidcCreateOidcCustomPropertyInclusionForOrgBody>,
      ) =>
        httpResource<OidcCreateOidcCustomPropertyInclusionForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/oidc/customization/properties/repo`,
            method: 'POST',
            body,
          }),
        );
    },
  };
}
