import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesCodespaceMachinesForAuthenticatedUserResponse =
  paths['/user/codespaces/{codespace_name}/machines']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_CODESPACE_MACHINES_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      codespaceName: string,
    ) => ReturnType<
      typeof httpResource<CodespacesCodespaceMachinesForAuthenticatedUserResponse>
    >
  >('CODESPACES_CODESPACE_MACHINES_FOR_AUTHENTICATED_USER');

export function provideCodespacesCodespaceMachinesForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_CODESPACE_MACHINES_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (codespaceName: string) =>
        httpResource<CodespacesCodespaceMachinesForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/codespaces/${codespaceName}/machines`,
          }),
        );
    },
  };
}
