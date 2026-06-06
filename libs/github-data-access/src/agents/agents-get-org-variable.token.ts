import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsGetOrgVariableResponse =
  paths['/orgs/{org}/agents/variables/{name}']['get']['responses']['200']['content']['application/json'];

export const AGENTS_GET_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    name: string,
  ) => ReturnType<typeof httpResource<AgentsGetOrgVariableResponse>>
>('AGENTS_GET_ORG_VARIABLE');

export function provideAgentsGetOrgVariable(): FactoryProvider {
  return {
    provide: AGENTS_GET_ORG_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, name: string) =>
        httpResource<AgentsGetOrgVariableResponse>(() => ({
          url: `${base}/orgs/${org}/agents/variables/${name}`,
        }));
    },
  };
}
