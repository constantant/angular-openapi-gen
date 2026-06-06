import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesGetForAuthenticatedUserResponse =
  paths['/user/codespaces/{codespace_name}']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_GET_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    codespaceName: string,
  ) => ReturnType<
    typeof httpResource<CodespacesGetForAuthenticatedUserResponse>
  >
>('CODESPACES_GET_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (codespaceName: string) =>
      httpResource<CodespacesGetForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/codespaces/${codespaceName}`,
      }));
  },
});
