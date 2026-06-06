import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OidcListOidcCustomPropertyInclusionsForOrgResponse =
  paths['/orgs/{org}/actions/oidc/customization/properties/repo']['get']['responses']['200']['content']['application/json'];

export const OIDC_LIST_OIDC_CUSTOM_PROPERTY_INCLUSIONS_FOR_ORG =
  new InjectionToken<
    (
      org: string,
    ) => ReturnType<
      typeof httpResource<OidcListOidcCustomPropertyInclusionsForOrgResponse>
    >
  >('OIDC_LIST_OIDC_CUSTOM_PROPERTY_INCLUSIONS_FOR_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string) =>
        httpResource<OidcListOidcCustomPropertyInclusionsForOrgResponse>(
          () => ({
            url: `${base}/orgs/${org}/actions/oidc/customization/properties/repo`,
          }),
        );
    },
  });
