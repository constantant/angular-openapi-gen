import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesStopInOrganizationResponse =
  paths['/orgs/{org}/members/{username}/codespaces/{codespace_name}/stop']['post']['responses']['200']['content']['application/json'];

export const CODESPACES_STOP_IN_ORGANIZATION = new InjectionToken<
  (
    org: string,
    username: string,
    codespaceName: string,
  ) => ReturnType<typeof httpResource<CodespacesStopInOrganizationResponse>>
>('CODESPACES_STOP_IN_ORGANIZATION');

export function provideCodespacesStopInOrganization(): FactoryProvider {
  return {
    provide: CODESPACES_STOP_IN_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, username: string, codespaceName: string) =>
        httpResource<CodespacesStopInOrganizationResponse>(() => ({
          url: `${base}/orgs/${org}/members/${username}/codespaces/${codespaceName}/stop`,
          method: 'POST',
        }));
    },
  };
}
