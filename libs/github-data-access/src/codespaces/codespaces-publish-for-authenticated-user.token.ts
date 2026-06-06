import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesPublishForAuthenticatedUserBody = NonNullable<
  paths['/user/codespaces/{codespace_name}/publish']['post']['requestBody']
>['content']['application/json'];

export type CodespacesPublishForAuthenticatedUserResponse =
  paths['/user/codespaces/{codespace_name}/publish']['post']['responses']['201']['content']['application/json'];

export const CODESPACES_PUBLISH_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    codespaceName: string,
    body:
      | CodespacesPublishForAuthenticatedUserBody
      | Signal<CodespacesPublishForAuthenticatedUserBody>,
  ) => ReturnType<
    typeof httpResource<CodespacesPublishForAuthenticatedUserResponse>
  >
>('CODESPACES_PUBLISH_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      codespaceName: string,
      body:
        | CodespacesPublishForAuthenticatedUserBody
        | Signal<CodespacesPublishForAuthenticatedUserBody>,
    ) =>
      httpResource<CodespacesPublishForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/codespaces/${codespaceName}/publish`,
        method: 'POST',
        body,
      }));
  },
});
