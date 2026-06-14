import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CopilotSpacesListForOrgParams =
  paths['/orgs/{org}/copilot-spaces']['get']['parameters']['query'];

export type CopilotSpacesListForOrgResponse =
  paths['/orgs/{org}/copilot-spaces']['get']['responses']['200']['content']['application/json'];

export const COPILOT_SPACES_LIST_FOR_ORG = new InjectionToken<
  (
    org: string,
    params?:
      | CopilotSpacesListForOrgParams
      | (() => CopilotSpacesListForOrgParams | undefined),
  ) => ReturnType<typeof httpResource<CopilotSpacesListForOrgResponse>>
>('COPILOT_SPACES_LIST_FOR_ORG');

export function provideCopilotSpacesListForOrg(): FactoryProvider {
  return {
    provide: COPILOT_SPACES_LIST_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        params?:
          | CopilotSpacesListForOrgParams
          | (() => CopilotSpacesListForOrgParams | undefined),
      ) =>
        httpResource<CopilotSpacesListForOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/copilot-spaces`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
