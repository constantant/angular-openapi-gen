import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsSetAllowedActionsRepositoryBody = NonNullable<
  paths['/repos/{owner}/{repo}/actions/permissions/selected-actions']['put']['requestBody']
>['content']['application/json'];

export const ACTIONS_SET_ALLOWED_ACTIONS_REPOSITORY = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | ActionsSetAllowedActionsRepositoryBody
      | Signal<ActionsSetAllowedActionsRepositoryBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ACTIONS_SET_ALLOWED_ACTIONS_REPOSITORY');

export function provideActionsSetAllowedActionsRepository(): FactoryProvider {
  return {
    provide: ACTIONS_SET_ALLOWED_ACTIONS_REPOSITORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body:
          | ActionsSetAllowedActionsRepositoryBody
          | Signal<ActionsSetAllowedActionsRepositoryBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/permissions/selected-actions`,
          method: 'PUT',
          body,
        }));
    },
  };
}
