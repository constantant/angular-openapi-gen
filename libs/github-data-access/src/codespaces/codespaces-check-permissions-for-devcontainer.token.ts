import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesCheckPermissionsForDevcontainerParams =
  paths['/repos/{owner}/{repo}/codespaces/permissions_check']['get']['parameters']['query'];

export type CodespacesCheckPermissionsForDevcontainerResponse =
  paths['/repos/{owner}/{repo}/codespaces/permissions_check']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_CHECK_PERMISSIONS_FOR_DEVCONTAINER = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | CodespacesCheckPermissionsForDevcontainerParams
      | (() => CodespacesCheckPermissionsForDevcontainerParams | undefined),
  ) => ReturnType<
    typeof httpResource<CodespacesCheckPermissionsForDevcontainerResponse>
  >
>('CODESPACES_CHECK_PERMISSIONS_FOR_DEVCONTAINER');

export function provideCodespacesCheckPermissionsForDevcontainer(): FactoryProvider {
  return {
    provide: CODESPACES_CHECK_PERMISSIONS_FOR_DEVCONTAINER,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | CodespacesCheckPermissionsForDevcontainerParams
          | (() => CodespacesCheckPermissionsForDevcontainerParams | undefined),
      ) =>
        httpResource<CodespacesCheckPermissionsForDevcontainerResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/codespaces/permissions_check`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
