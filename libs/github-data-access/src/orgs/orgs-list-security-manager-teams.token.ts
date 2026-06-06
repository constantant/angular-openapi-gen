import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type OrgsListSecurityManagerTeamsResponse =
  paths['/orgs/{org}/security-managers']['get']['responses']['200']['content']['application/json'];

export const ORGS_LIST_SECURITY_MANAGER_TEAMS = new InjectionToken<
  (
    org: string,
  ) => ReturnType<typeof httpResource<OrgsListSecurityManagerTeamsResponse>>
>('ORGS_LIST_SECURITY_MANAGER_TEAMS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string) =>
      httpResource<OrgsListSecurityManagerTeamsResponse>(() => ({
        url: `${base}/orgs/${org}/security-managers`,
      }));
  },
});
