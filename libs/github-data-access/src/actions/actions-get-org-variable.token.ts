import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsGetOrgVariableResponse =
  paths['/orgs/{org}/actions/variables/{name}']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_GET_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    name: string,
  ) => ReturnType<typeof httpResource<ActionsGetOrgVariableResponse>>
>('ACTIONS_GET_ORG_VARIABLE');

export function provideActionsGetOrgVariable(): FactoryProvider {
  return {
    provide: ACTIONS_GET_ORG_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, name: string) =>
        httpResource<ActionsGetOrgVariableResponse>(() => ({
          url: `${base}/orgs/${org}/actions/variables/${name}`,
        }));
    },
  };
}
