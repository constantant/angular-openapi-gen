import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotRepositoryAccessForOrgParams =
  paths['/orgs/{org}/dependabot/repository-access']['get']['parameters']['query'];

export type DependabotRepositoryAccessForOrgResponse =
  paths['/orgs/{org}/dependabot/repository-access']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_REPOSITORY_ACCESS_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | DependabotRepositoryAccessForOrgParams
      | (() => DependabotRepositoryAccessForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<DependabotRepositoryAccessForOrgResponse>>
>('DEPENDABOT_REPOSITORY_ACCESS_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | DependabotRepositoryAccessForOrgParams
        | (() => DependabotRepositoryAccessForOrgParams | undefined),
    ) =>
      httpResource<DependabotRepositoryAccessForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/dependabot/repository-access`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
