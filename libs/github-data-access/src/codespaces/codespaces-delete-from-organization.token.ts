import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const CODESPACES_DELETE_FROM_ORGANIZATION = new InjectionToken<
  (
    org: string,
    username: string,
    codespaceName: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODESPACES_DELETE_FROM_ORGANIZATION');

export function provideCodespacesDeleteFromOrganization(): FactoryProvider {
  return {
    provide: CODESPACES_DELETE_FROM_ORGANIZATION,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, username: string, codespaceName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/members/${username}/codespaces/${codespaceName}`,
          method: 'DELETE',
        }));
    },
  };
}
