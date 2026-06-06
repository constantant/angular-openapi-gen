import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesStartForAuthenticatedUserResponse =
  paths['/user/codespaces/{codespace_name}/start']['post']['responses']['200']['content']['application/json'];

export const CODESPACES_START_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    codespaceName: string,
  ) => ReturnType<
    typeof httpResource<CodespacesStartForAuthenticatedUserResponse>
  >
>('CODESPACES_START_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (codespaceName: string) =>
      httpResource<CodespacesStartForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/codespaces/${codespaceName}/start`,
        method: 'POST',
      }));
  },
});
