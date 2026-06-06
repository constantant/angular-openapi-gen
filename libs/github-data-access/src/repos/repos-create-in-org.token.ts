import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposCreateInOrgBody = NonNullable<
  paths['/orgs/{org}/repos']['post']['requestBody']
>['content']['application/json'];

export type ReposCreateInOrgResponse =
  paths['/orgs/{org}/repos']['post']['responses']['201']['content']['application/json'];

export const REPOS_CREATE_IN_ORG = new InjectionToken<
  (
    org: string,
    body: ReposCreateInOrgBody | Signal<ReposCreateInOrgBody>,
  ) => ReturnType<typeof httpResource<ReposCreateInOrgResponse>>
>('REPOS_CREATE_IN_ORG');

export function provideReposCreateInOrg(): FactoryProvider {
  return {
    provide: REPOS_CREATE_IN_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        body: ReposCreateInOrgBody | Signal<ReposCreateInOrgBody>,
      ) =>
        httpResource<ReposCreateInOrgResponse>(() => ({
          url: `${base}/orgs/${org}/repos`,
          method: 'POST',
          body,
        }));
    },
  };
}
