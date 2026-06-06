import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsBody =
  NonNullable<
    paths['/orgs/{org}/properties/schema']['patch']['requestBody']
  >['content']['application/json'];

export type OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsResponse =
  paths['/orgs/{org}/properties/schema']['patch']['responses']['200']['content']['application/json'];

export const ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITIONS =
  new InjectionToken<
    (
      org: string,
      body:
        | OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsBody
        | Signal<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsBody>,
    ) => ReturnType<
      typeof httpResource<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsResponse>
    >
  >(
    'ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_DEFINITIONS',
    {
      providedIn: 'root',
      factory: () => {
        const base = inject(GITHUB_BASE_URL);
        return (
          org: string,
          body:
            | OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsBody
            | Signal<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsBody>,
        ) =>
          httpResource<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationDefinitionsResponse>(
            () => ({
              url: `${base}/orgs/${org}/properties/schema`,
              method: 'PATCH',
              body,
            }),
          );
      },
    },
  );
