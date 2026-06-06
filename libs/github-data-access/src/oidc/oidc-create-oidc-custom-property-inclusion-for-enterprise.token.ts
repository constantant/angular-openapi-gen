import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OidcCreateOidcCustomPropertyInclusionForEnterpriseBody =
  NonNullable<
    paths['/enterprises/{enterprise}/actions/oidc/customization/properties/repo']['post']['requestBody']
  >['content']['application/json'];

export type OidcCreateOidcCustomPropertyInclusionForEnterpriseResponse =
  paths['/enterprises/{enterprise}/actions/oidc/customization/properties/repo']['post']['responses']['201']['content']['application/json'];

export const OIDC_CREATE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ENTERPRISE =
  new InjectionToken<
    (
      enterprise: string,
      body:
        | OidcCreateOidcCustomPropertyInclusionForEnterpriseBody
        | Signal<OidcCreateOidcCustomPropertyInclusionForEnterpriseBody>,
    ) => ReturnType<
      typeof httpResource<OidcCreateOidcCustomPropertyInclusionForEnterpriseResponse>
    >
  >('OIDC_CREATE_OIDC_CUSTOM_PROPERTY_INCLUSION_FOR_ENTERPRISE', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        body:
          | OidcCreateOidcCustomPropertyInclusionForEnterpriseBody
          | Signal<OidcCreateOidcCustomPropertyInclusionForEnterpriseBody>,
      ) =>
        httpResource<OidcCreateOidcCustomPropertyInclusionForEnterpriseResponse>(
          () => ({
            url: `${base}/enterprises/${enterprise}/actions/oidc/customization/properties/repo`,
            method: 'POST',
            body,
          }),
        );
    },
  });
