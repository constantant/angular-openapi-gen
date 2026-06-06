import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsGetOrgRoleResponse =
  paths['/orgs/{org}/organization-roles/{role_id}']['get']['responses']['200']['content']['application/json'];

export const ORGS_GET_ORG_ROLE = new InjectionToken<
  (
    org: string,
    roleId: string,
  ) => ReturnType<typeof httpResource<OrgsGetOrgRoleResponse>>
>('ORGS_GET_ORG_ROLE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, roleId: string) =>
      httpResource<OrgsGetOrgRoleResponse>(() => ({
        url: `${base}/orgs/${org}/organization-roles/${roleId}`,
      }));
  },
});
