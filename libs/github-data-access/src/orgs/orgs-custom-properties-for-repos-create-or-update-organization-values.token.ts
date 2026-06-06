import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsCustomPropertiesForReposCreateOrUpdateOrganizationValuesBody =
  NonNullable<
    paths['/orgs/{org}/properties/values']['patch']['requestBody']
  >['content']['application/json'];

export const ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_VALUES =
  new InjectionToken<
    (
      org: string,
      body:
        | OrgsCustomPropertiesForReposCreateOrUpdateOrganizationValuesBody
        | Signal<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationValuesBody>,
    ) => ReturnType<typeof httpResource<unknown>>
  >('ORGS_CUSTOM_PROPERTIES_FOR_REPOS_CREATE_OR_UPDATE_ORGANIZATION_VALUES', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body:
          | OrgsCustomPropertiesForReposCreateOrUpdateOrganizationValuesBody
          | Signal<OrgsCustomPropertiesForReposCreateOrUpdateOrganizationValuesBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/properties/values`,
          method: 'PATCH',
          body,
        }));
    },
  });
