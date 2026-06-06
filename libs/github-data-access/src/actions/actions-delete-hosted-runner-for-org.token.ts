import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DELETE_HOSTED_RUNNER_FOR_ORG = new InjectionToken<
  (
    org: string,
    hostedRunnerId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DELETE_HOSTED_RUNNER_FOR_ORG');

export function provideActionsDeleteHostedRunnerForOrg(): FactoryProvider {
  return {
    provide: ACTIONS_DELETE_HOSTED_RUNNER_FOR_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, hostedRunnerId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/hosted-runners/${hostedRunnerId}`,
          method: 'DELETE',
        }));
    },
  };
}
