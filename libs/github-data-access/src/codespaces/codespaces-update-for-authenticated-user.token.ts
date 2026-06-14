import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesUpdateForAuthenticatedUserBody = NonNullable<
  paths['/user/codespaces/{codespace_name}']['patch']['requestBody']
>['content']['application/json'];

export type CodespacesUpdateForAuthenticatedUserResponse =
  paths['/user/codespaces/{codespace_name}']['patch']['responses']['200']['content']['application/json'];

export const CODESPACES_UPDATE_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    codespaceName: string,
    body:
      | CodespacesUpdateForAuthenticatedUserBody
      | Signal<CodespacesUpdateForAuthenticatedUserBody>,
  ) => ReturnType<
    typeof httpResource<CodespacesUpdateForAuthenticatedUserResponse>
  >
>('CODESPACES_UPDATE_FOR_AUTHENTICATED_USER');

export function provideCodespacesUpdateForAuthenticatedUser(): FactoryProvider {
  return {
    provide: CODESPACES_UPDATE_FOR_AUTHENTICATED_USER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        codespaceName: string,
        body:
          | CodespacesUpdateForAuthenticatedUserBody
          | Signal<CodespacesUpdateForAuthenticatedUserBody>,
      ) =>
        httpResource<CodespacesUpdateForAuthenticatedUserResponse>(() => ({
          url: `${base}/user/codespaces/${codespaceName}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
