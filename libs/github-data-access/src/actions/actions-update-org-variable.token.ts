import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsUpdateOrgVariableBody = NonNullable<
  paths['/orgs/{org}/actions/variables/{name}']['patch']['requestBody']
>['content']['application/json'];

export const ACTIONS_UPDATE_ORG_VARIABLE = new InjectionToken<
  (
    org: string,
    name: string,
    body: ActionsUpdateOrgVariableBody | Signal<ActionsUpdateOrgVariableBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_UPDATE_ORG_VARIABLE');

export function provideActionsUpdateOrgVariable(): FactoryProvider {
  return {
    provide: ACTIONS_UPDATE_ORG_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        name: string,
        body:
          | ActionsUpdateOrgVariableBody
          | Signal<ActionsUpdateOrgVariableBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/variables/${name}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
