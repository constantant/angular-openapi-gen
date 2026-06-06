import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesGetExportDetailsForAuthenticatedUserResponse =
  paths['/user/codespaces/{codespace_name}/exports/{export_id}']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_GET_EXPORT_DETAILS_FOR_AUTHENTICATED_USER =
  new InjectionToken<
    (
      codespaceName: string,
      exportId: string,
    ) => ReturnType<
      typeof httpResource<CodespacesGetExportDetailsForAuthenticatedUserResponse>
    >
  >('CODESPACES_GET_EXPORT_DETAILS_FOR_AUTHENTICATED_USER', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (codespaceName: string, exportId: string) =>
        httpResource<CodespacesGetExportDetailsForAuthenticatedUserResponse>(
          () => ({
            url: `${base}/user/codespaces/${codespaceName}/exports/${exportId}`,
          }),
        );
    },
  });
