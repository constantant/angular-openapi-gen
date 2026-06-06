import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsListOrgVariablesParams =
  paths['/orgs/{org}/agents/variables']['get']['parameters']['query'];

export type AgentsListOrgVariablesResponse =
  paths['/orgs/{org}/agents/variables']['get']['responses']['200']['content']['application/json'];

export const AGENTS_LIST_ORG_VARIABLES = new InjectionToken<
  (
    org: string,
    params?:
      | AgentsListOrgVariablesParams
      | (() => AgentsListOrgVariablesParams | undefined),
  ) => ReturnType<typeof httpResource<AgentsListOrgVariablesResponse>>
>('AGENTS_LIST_ORG_VARIABLES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      params?:
        | AgentsListOrgVariablesParams
        | (() => AgentsListOrgVariablesParams | undefined),
    ) =>
      httpResource<AgentsListOrgVariablesResponse>(() => ({
        url: `${base}/orgs/${org}/agents/variables`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
