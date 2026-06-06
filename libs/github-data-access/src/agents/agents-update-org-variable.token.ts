import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsUpdateOrgVariableBody = NonNullable<
  paths['/orgs/{org}/agents/variables/{name}']['patch']['requestBody']
>['content']['application/json'];

export const AGENTS_UPDATE_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    name: string,
    body: AgentsUpdateOrgVariableBody | Signal<AgentsUpdateOrgVariableBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('AGENTS_UPDATE_ORG_VARIABLE');

export function provideAgentsUpdateOrgVariable(): FactoryProvider {
  return {
    provide: AGENTS_UPDATE_ORG_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        name: string,
        body: AgentsUpdateOrgVariableBody | Signal<AgentsUpdateOrgVariableBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/agents/variables/${name}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
