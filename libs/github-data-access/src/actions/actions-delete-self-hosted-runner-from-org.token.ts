import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_ORG = new InjectionToken<
  (org: string, runnerId: string) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_ORG');

export function provideActionsDeleteSelfHostedRunnerFromOrg(): FactoryProvider {
  return {
    provide: ACTIONS_DELETE_SELF_HOSTED_RUNNER_FROM_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, runnerId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/orgs/${org}/actions/runners/${runnerId}`,
          method: 'DELETE',
        }));
    },
  };
}
