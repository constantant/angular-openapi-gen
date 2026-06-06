import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OidcUpdateOidcCustomSubTemplateForOrgBody = NonNullable<
  paths['/orgs/{org}/actions/oidc/customization/sub']['put']['requestBody']
>['content']['application/json'];

export type OidcUpdateOidcCustomSubTemplateForOrgResponse =
  paths['/orgs/{org}/actions/oidc/customization/sub']['put']['responses']['201']['content']['application/json'];

export const OIDC_UPDATE_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG = new InjectionToken<
  (
    org: string,
    body:
      | OidcUpdateOidcCustomSubTemplateForOrgBody
      | Signal<OidcUpdateOidcCustomSubTemplateForOrgBody>,
  ) => ReturnType<
    typeof httpResource<OidcUpdateOidcCustomSubTemplateForOrgResponse>
  >
>('OIDC_UPDATE_OIDC_CUSTOM_SUB_TEMPLATE_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body:
        | OidcUpdateOidcCustomSubTemplateForOrgBody
        | Signal<OidcUpdateOidcCustomSubTemplateForOrgBody>,
    ) =>
      httpResource<OidcUpdateOidcCustomSubTemplateForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/actions/oidc/customization/sub`,
        method: 'PUT',
        body,
      }));
  },
});
