import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ACTIONS_DELETE_ENVIRONMENT_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    environmentName: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_DELETE_ENVIRONMENT_SECRET');

export function provideActionsDeleteEnvironmentSecret(): FactoryProvider {
  return {
    provide: ACTIONS_DELETE_ENVIRONMENT_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        environmentName: string,
        secretName: string,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/environments/${environmentName}/secrets/${secretName}`,
          method: 'DELETE',
        }));
    },
  };
}
