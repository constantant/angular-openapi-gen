import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DELETE_ENVIRONMENT_VARIABLE = new InjectionToken<
  (
    owner: string,
    repo: string,
    name: string,
    environmentName: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DELETE_ENVIRONMENT_VARIABLE');

export function provideActionsDeleteEnvironmentVariable(): FactoryProvider {
  return {
    provide: ACTIONS_DELETE_ENVIRONMENT_VARIABLE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        name: string,
        environmentName: string,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/variables/${name}`,
          method: 'DELETE',
        }));
    },
  };
}
